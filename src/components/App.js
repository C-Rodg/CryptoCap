// Libraries
import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
const app = require("electron").remote.app;
import update from "immutability-helper";

// Styles
import "../styles/default.css";

// Components
import ContentHome from "./ContentHome/ContentHome";
import ContentSettings from "./ContentSettings/ContentSettings";
import ContentPriceAlert from "./ContentPriceAlert/ContentPriceAlert";
import ContentCoin from "./ContentCoin/ContentCoin";
import ContentGraph from "./ContentGraph/ContentGraph";

// Utilities
import {
	getExchangeRates,
	getGlobalInfo,
	getFullCryptoList,
	getSpecificCrypto
} from "../utils/cryptoApi";
import { translateCurrency } from "../utils/currency";

const iconPath = `data:image/png;base64,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`;

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
		if (Notification && Notification.permission === "granted") {
			this._notificationsEnabled = true;
		} else if (Notification) {
			Notification.requestPermission(permission => {
				if (permission === "granted") {
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
		const savedSettingsString = window.localStorage.getItem("crypto_settings");
		if (savedSettingsString) {
			storedSettings = JSON.parse(savedSettingsString);
		}
		return Object.assign({}, defaultSettings, storedSettings);
	}

	// Update settings object in storage
	updateSettingsObject(obj) {
		const storedSettingsString = window.localStorage.getItem("crypto_settings");
		let storedSettingsObject = this.getDefaultSettings();
		if (storedSettingsString) {
			storedSettingsObject = JSON.parse(storedSettingsString);
		}
		const updatedSettings = Object.assign({}, storedSettingsObject, obj);
		window.localStorage.setItem(
			"crypto_settings",
			JSON.stringify(updatedSettings)
		);
	}

	// Get Default Settings
	getDefaultSettings() {
		return {
			selectedFiatCurrency: "USD",
			selectedLocale: "en-US",
			backgroundTickerTime: 10,
			mySavedCryptoIds: ["BTC", "ETH", "XRP", "LTC", "NEO", "XMR"],
			priceAlerts: []
		};
	}

	// Quit button clicked
	handleCloseApp() {
		app.hide();
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
		if (isSelected === "true") {
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
					console.log(r.data);
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
		// TODO ADD ICON IMAGE C in blue
		notes.forEach((note, idx) => {
			setTimeout(() => {
				const no = new Notification(note, {
					body: "CryptoCap Price Alert!",
					icon: iconPath
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
				globalData: resp.data
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
