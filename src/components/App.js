// Libraries
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
const app = require('electron').remote.app;
import update from 'immutability-helper';

// Styles
import '../styles/default.css';

// Components
import ContentHome from './ContentHome/ContentHome';
import ContentSettings from './ContentSettings/ContentSettings';
import ContentPriceAlert from './ContentPriceAlert/ContentPriceAlert';
import ContentCoin from './ContentCoin/ContentCoin';
import ContentGraph from './ContentGraph/ContentGraph';

// Utilities
import {
	getExchangeRates,
	getGlobalInfo,
	getFullCryptoList,
	getSpecificCrypto
} from '../utils/cryptoApi';
import { translateCurrency } from '../utils/currency';

class App extends Component {
	constructor(props) {
		super(props);

		const storedSettings = this.getSettingsObject();

		this.state = {
			exchangeRates: null,
			globalData: null,
			fullCryptoList: [],
			mySavedCryptos: [],
			...storedSettings
		};

		// Tickers
		this._tickerInterval = null;
		this._dailyInterval = null;

		// Notification Flag
		this._notificationsEnabled = false;
		if (Notification && Notification.permission === 'granted') {
			this._notificationsEnabled = true;
		} else if (Notification) {
			Notification.requestPermission(permission => {
				if (permission === 'granted') {
					this._notificationsEnabled = true;
				}
			});
		}
	}

	componentDidMount() {
		// Set Interval for checking for crypto price changes
		this._tickerInterval = window.setInterval(
			this.updateCryptoPrices,
			this.state.backgroundTickerTime * 1000 * 60
		);

		// Get Global Info and Saved Crypto Prices
		this.updateCryptoPrices();

		// Get Initial Exchange Rates, Full Crypto List
		this.getDailyInformation();

		// Set interval for every 24 hours
		this._dailyInterval = window.setInterval(
			this.getDailyInformation,
			86400000
		);
	}

	// Do Daily Tasks
	getDailyInformation = () => {
		this.updateExchangeRates();
		this.updateFullCryptoList();
	};

	// Get Settings Object from storage
	getSettingsObject() {
		const defaultSettings = this.getDefaultSettings();
		let storedSettings = {};
		const savedSettingsString = window.localStorage.getItem('crypto_settings');
		if (savedSettingsString) {
			storedSettings = JSON.parse(savedSettingsString);
		}
		return Object.assign({}, defaultSettings, storedSettings);
	}

	// Update settings object in storage
	updateSettingsObject(obj) {
		const storedSettingsString = window.localStorage.getItem('crypto_settings');
		let storedSettingsObject = this.getDefaultSettings();
		if (storedSettingsString) {
			storedSettingsObject = JSON.parse(storedSettingsString);
		}
		const updatedSettings = Object.assign({}, storedSettingsObject, obj);
		window.localStorage.setItem(
			'crypto_settings',
			JSON.stringify(updatedSettings)
		);
	}

	// Get Default Settings
	getDefaultSettings() {
		return {
			selectedFiatCurrency: 'USD',
			selectedLocale: 'en-US',
			backgroundTickerTime: 10,
			mySavedCryptoIds: ['BTC', 'ETH', 'XRP', 'LTC', 'NEO', 'XMR'],
			priceAlerts: []
		};
	}

	// Quit button clicked
	handleCloseApp() {
		app.quit();
	}

	// Minimize button clicked
	handleMinimize() {
		app.hide();
		app.blur();
	}

	// Fiat Currency Type Changed
	handleCurrencyTypeChange = select => {
		const updateObject = {
			selectedFiatCurrency: select.value,
			selectedLocale: select.locale
		};
		this.setState(updateObject);

		// Save to local
		this.updateSettingsObject(updateObject);
	};

	// Update state for backgroundTickerTime
	handleChangeTickerTime = time => {
		this.setState({ backgroundTickerTime: time });
	};

	// New backgroundTickerTime has been set
	handleSetTickerTime = time => {
		// Clear original interval
		clearInterval(this._tickerInterval);

		// Set new interval
		this._tickerInterval = window.setInterval(
			this.updateCryptoPrices,
			time * 1000 * 60
		);

		// Save to local
		this.updateSettingsObject({ backgroundTickerTime: time });
	};

	// Handle moving of saved cryptos
	handleMovedCrypto = (dragIndex, hoverIndex) => {
		const { mySavedCryptos, mySavedCryptoIds } = this.state;
		const dragTileItem = mySavedCryptos[dragIndex];
		const dragTileId = mySavedCryptoIds[dragIndex];

		this.setState(
			update(this.state, {
				mySavedCryptos: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragTileItem]]
				},
				mySavedCryptoIds: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragTileId]]
				}
			}),
			() => {
				this.updateSettingsObject({
					mySavedCryptoIds: this.state.mySavedCryptoIds
				});
			}
		);
	};

	// Handle Toggling of saved crypto
	handleToggleSavedCoin = (id, isSelected) => {
		// Remove from mySavedCryptoIds, mySavedCryptos, and remove price alerts
		if (isSelected === 'true') {
			const newSavedIds = this.state.mySavedCryptoIds.filter(c => c !== id);
			const newMySavedCryptos = this.state.mySavedCryptos.filter(
				c => (c.id || c.symbol) !== id
			);
			const newMyPriceAlerts = this.state.priceAlerts.filter(
				c => c.coin !== id
			);
			this.updateSettingsObject({
				mySavedCryptoIds: newSavedIds,
				priceAlerts: newMyPriceAlerts
			});
			this.setState({
				mySavedCryptoIds: newSavedIds,
				mySavedCryptos: newMySavedCryptos,
				priceAlerts: newMyPriceAlerts
			});
		} else {
			// Add to mySavedCryptoIds, mySavedCryptos
			this.setState(
				{ mySavedCryptoIds: [...this.state.mySavedCryptoIds, id] },
				() => {
					// Save to local
					this.updateSettingsObject({
						mySavedCryptoIds: this.state.mySavedCryptoIds
					});
				}
			);
		}
	};

	// Remove price alert
	handleRemovePriceAlert = id => isBelow => ev => {
		const newAlerts = [...this.state.priceAlerts].filter(al => {
			if (al.coin === id && al.alertBelow === isBelow) {
				return false;
			}
			return true;
		});
		const saveObject = { priceAlerts: newAlerts };
		this.updateSettingsObject(saveObject);
		this.setState(saveObject);
	};

	// Alert has been added
	handleAddAlert = alertObject => {
		// Filter out same type of alerts
		const myNewPriceAlerts = this.state.priceAlerts.filter(alert => {
			if (
				alert.coin === alertObject.coin &&
				alert.alertBelow === alertObject.alertBelow
			) {
				return false;
			}
			return true;
		});
		// Add new alert
		myNewPriceAlerts.push(alertObject);

		// Save to Local
		const priceObject = {
			priceAlerts: myNewPriceAlerts
		};
		this.updateSettingsObject(priceObject);
		this.setState(priceObject);
	};

	// Handle API updates
	updateCryptoPrices = () => {
		// Update individual cryptos
		const cryptoPromises = [];
		const newCryptoList = [];
		this.state.mySavedCryptoIds.forEach(id => {
			cryptoPromises.push(getSpecificCrypto(id));
		});
		Promise.all(cryptoPromises).then(results => {
			const responseData = [];
			results.forEach(r => {
				if (r.data) {
					newCryptoList.push(r.data);
					responseData.push(r.data);
				}
			});
			this.checkForPriceAlert(responseData);
			this.setState({
				mySavedCryptos: newCryptoList
			});
		});

		// Update Global Info
		this.updateGlobalData();

		// Update daily info if it doesn't exist yet
		if (!this.state.exchangeRates || !this.state.fullCryptoList) {
			this.getDailyInformation();
		}
	};

	// Check for price alert
	checkForPriceAlert = cryptoInfoArray => {
		const priceAlerts = [...this.state.priceAlerts];
		const notificationArray = [];
		const type = this.state.selectedFiatCurrency;
		const locale = this.state.selectedLocale;

		priceAlerts.forEach(priceAlert => {
			const specifiedCrypto = cryptoInfoArray.find(
				crypto => crypto.id === priceAlert.coin
			);
			if (specifiedCrypto) {
				if (
					priceAlert.alertBelow &&
					specifiedCrypto.price_usd < priceAlert.priceUSD
				) {
					// alert below a specified price
					notificationArray.push(
						`${specifiedCrypto.id} is below ${translateCurrency(
							priceAlert.priceUSD,
							type,
							locale,
							this.state.exchangeRates
						)}`
					);
					priceAlert.hasAlerted = true;
				} else if (
					!priceAlert.alertBelow &&
					specifiedCrypto.price_usd > priceAlert.priceUSD
				) {
					// alert above a specified price
					notificationArray.push(
						`${specifiedCrypto.id} is above ${translateCurrency(
							priceAlert.priceUSD,
							type,
							locale,
							this.state.exchangeRates
						)}`
					);
					priceAlert.hasAlerted = true;
				}
			}
		});

		const newPriceAlerts = priceAlerts.filter(al => !al.hasAlerted);
		if (notificationArray.length > 0) {
			this.showNotifications(notificationArray);
		}

		const saveObject = { priceAlerts: newPriceAlerts };

		// Update local price alerts, update state
		this.updateSettingsObject(saveObject);
		this.setState(saveObject);
	};

	// Display notifications
	showNotifications = notes => {
		if (!this._notificationsEnabled) {
			return false;
		}
		notes.forEach((note, idx) => {
			setTimeout(() => {
				const no = new Notification(note, {
					body: 'CryptoCap Price Alert!'
				});
			}, 2000 * idx);
		});
	};

	// Get Exchange Rates
	updateExchangeRates = () => {
		getExchangeRates().then(resp => {
			this.setState({
				exchangeRates: resp.data
			});
		});
	};

	// Get Global Data
	updateGlobalData = () => {
		getGlobalInfo().then(resp => {
			this.setState({
				globalData: resp.data.data
			});
		});
	};

	// Get Full Crypto List
	updateFullCryptoList = () => {
		getFullCryptoList().then(resp => {
			this.setState({
				fullCryptoList: resp.data
			});
		});
	};

	render() {
		return (
			<div className="app">
				<Route
					path="/"
					exact
					render={props => {
						return (
							<ContentHome
								{...props}
								onCloseApp={this.handleCloseApp}
								onMinimizeApp={this.handleMinimize}
								globalData={this.state.globalData}
								selectedFiatCurrency={this.state.selectedFiatCurrency}
								selectedLocale={this.state.selectedLocale}
								exchangeRates={this.state.exchangeRates}
								mySavedCryptos={this.state.mySavedCryptos}
								onMovedCrypto={this.handleMovedCrypto}
							/>
						);
					}}
				/>
				<Route
					path="/crypto/:id"
					render={props => {
						return (
							<ContentCoin
								{...props}
								selectedFiatCurrency={this.state.selectedFiatCurrency}
								selectedLocale={this.state.selectedLocale}
								exchangeRates={this.state.exchangeRates}
								onToggleSavedCoin={this.handleToggleSavedCoin}
								onRemoveAlert={this.handleRemovePriceAlert}
								mySavedCryptoIds={this.state.mySavedCryptoIds}
								priceAlerts={this.state.priceAlerts}
								getUpdates={this.updateCryptoPrices}
							/>
						);
					}}
				/>
				<Route
					path="/graph/:id"
					render={props => {
						return (
							<ContentGraph
								{...props}
								selectedFiatCurrency={this.state.selectedFiatCurrency}
								selectedLocale={this.state.selectedLocale}
								exchangeRates={this.state.exchangeRates}
							/>
						);
					}}
				/>
				<Route
					path="/alert/:id"
					render={props => {
						return (
							<ContentPriceAlert
								{...props}
								selectedFiatCurrency={this.state.selectedFiatCurrency}
								exchangeRates={this.state.exchangeRates}
								onAddAlert={this.handleAddAlert}
							/>
						);
					}}
				/>
				<Route
					path="/settings"
					render={props => {
						return (
							<ContentSettings
								{...props}
								fullCryptoList={this.state.fullCryptoList}
								priceAlerts={this.state.priceAlerts}
								savedCryptoIds={this.state.mySavedCryptoIds}
								selectedFiatCurrency={this.state.selectedFiatCurrency}
								onCurrencyTypeChange={this.handleCurrencyTypeChange}
								backgroundTickerTime={this.state.backgroundTickerTime}
								onChangeTickerTime={this.handleChangeTickerTime}
								onSetTickerTime={this.handleSetTickerTime}
								onToggleCoin={this.handleToggleSavedCoin}
								getUpdates={this.updateCryptoPrices}
							/>
						);
					}}
				/>
			</div>
		);
	}
}

export default App;
