import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
const app = require("electron").remote.app;
import update from "immutability-helper";

import "../styles/default.css";
import ContentHome from "./ContentHome";
import ContentCoin from "./ContentCoin";
import ContentSettings from "./ContentSettings";
import ContentCreateAlert from "./ContentCreateAlert";
import { clearInterval } from "timers";
import { currencyTypes } from "../utils/currencyTypes";
import { formatCurrency, formatNumber } from "../utils/numberFormats";

class App extends Component {
	constructor() {
		super();

		// Get saved settings

		// Fiat Currencies
		const currencyType = window.localStorage.getItem("currency_type");
		const localeType = window.localStorage.getItem("locale_type");

		// Time format preference
		const time = window.localStorage.getItem("coin_time");

		// Background check time
		const tickerInt = window.localStorage.getItem("coin_ticker");

		// Favorite Cryptos
		const coinIds = window.localStorage.getItem("coin_ids");
		let savedIds = "bitcoin;ethereum;bitcoin-cash;ripple;litecoin;monero";
		if (coinIds) {
			savedIds = coinIds;
		}

		// Price Alerts
		let priceAlerts = [];
		const savedAlerts = window.localStorage.getItem("coin_alerts");
		if (savedAlerts) {
			priceAlerts = JSON.parse(savedAlerts).filter(al => !al.hasAlerted);
		}

		// Check for new data at set time
		let tickerTime = 2;
		if (tickerInt) {
			tickerTime = parseInt(tickerInt, 10);
		}

		this.tickerInterval = window.setInterval(
			this.getTickerInfo,
			tickerTime * 1000 * 60
		);

		// Set app state
		this.state = {
			fullCurrencyList: [],
			myCurrencyList: [],
			savedIds: savedIds.split(";"),
			globalInfo: {},
			timeFormat: time ? time : "24h",
			priceAlerts,
			tickerTime,
			currencyType: currencyType ? currencyType : "USD",
			localeType: localeType ? localeType : "en-us"
		};

		// Attempt to allow notifications
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

	// Get initial data
	componentDidMount() {
		this.getTickerInfo();
	}

	// Clear interval for checking for data
	componentWillUnmount() {
		clearInterval(this.tickerInterval);
	}

	// Get both ticker and global info
	getTickerInfo = () => {
		if (window.navigator.onLine) {
			this.getCompleteTicker();
			this.getGlobalInfo();
		}
	};

	// Get Complete list of markets
	getCompleteTicker = () => {
		axios
			.get(
				`https://api.coinmarketcap.com/v1/ticker/?convert=${
					this.state.currencyType
				}`
			)
			.then(resp => {
				this.createPriceNotification(resp.data);
				this.setState({
					fullCurrencyList: resp.data,
					myCurrencyList: this.getMyCurrencies(this.state.savedIds, resp.data)
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	// Preserve order of myCurrencyList
	getMyCurrencies(savedIds, fullList) {
		const myList = [];
		savedIds.forEach(save => {
			const crypto = fullList.find(item => item.id === save);
			if (crypto) {
				myList.push(crypto);
			}
		});
		return myList;
	}

	// Create notifications for price alerts
	createPriceNotification = currencyList => {
		const notifications = [];
		this.state.priceAlerts.forEach(al => {
			if (!al.hasAlerted) {
				const currency = currencyList.find(curr => curr.id === al.id);
				// If alert id doesn't exist in full currency list, just return - no longer deleting..
				if (!currency) {
					return false;
				}
				// If alert price < current price
				if (parseFloat(currency.price_usd, 10) <= al.price) {
					const formattedPrice = formatCurrency(al.price, "en-us", "USD");
					notifications.push(`${currency.name} is below ${formattedPrice}.`);
					al.hasAlerted = true;
				}
			}
		});

		// Show the notifications
		if (notifications.length > 0) {
			this.showNotifications(notifications);
		}

		// Clean up alerted prices
		const newAlertList = this.state.priceAlerts.filter(a => !a.hasAlerted);
		window.localStorage.setItem("coin_alerts", JSON.stringify(newAlertList));
		this.setState({
			priceAlerts: newAlertList
		});
	};

	// Display the notifications
	showNotifications = notes => {
		if (!this._notificationsEnabled) {
			return false;
		}
		notes.forEach((note, idx) => {
			const no = new Notification(note);
		});
	};

	// Get global information
	getGlobalInfo = () => {
		axios
			.get(
				`https://api.coinmarketcap.com/v1/global/?convert=${
					this.state.currencyType
				}`
			)
			.then(resp => {
				this.setState({ globalInfo: resp.data });
			})
			.catch(err => {
				console.log(err);
			});
	};

	// Switch from "7d", '24h', '1h' formats
	switchTimeFormat = (timeFormat, save) => {
		if (save) {
			window.localStorage.setItem("coin_time", timeFormat);
		}
		this.setState({
			timeFormat
		});
	};

	// Add or Remove saved id
	handleToggleSavedId = id => {
		const { savedIds, fullCurrencyList, priceAlerts } = this.state;
		let newSavedIds = [];
		let newPriceAlerts = priceAlerts;
		if (savedIds.indexOf(id) > -1) {
			newSavedIds = savedIds.filter(oldId => oldId !== id);
			newPriceAlerts = priceAlerts.filter(al => al.id !== id);
		} else {
			newSavedIds = [...savedIds, id];
		}
		window.localStorage.setItem("coin_ids", newSavedIds.join(";"));
		window.localStorage.setItem("coin_alerts", JSON.stringify(newPriceAlerts));

		this.setState({
			savedIds: newSavedIds,
			myCurrencyList: this.getMyCurrencies(newSavedIds, fullCurrencyList),
			priceAlerts: newPriceAlerts
		});
	};

	// Handle Add Alert
	handleAddAlert = obj => {
		const { priceAlerts } = this.state;
		const newAlerts = priceAlerts.filter(al => {
			if (al.hasAlerted || al.id === obj.id) {
				return false;
			}
			return true;
		});
		newAlerts.push(obj);
		window.localStorage.setItem("coin_alerts", JSON.stringify(newAlerts));
		this.setState({ priceAlerts: newAlerts });
	};

	// Handle removed alert
	handleRemoveAlert = id => {
		const { priceAlerts } = this.state;
		const newAlerts = priceAlerts.filter(al => {
			if (al.hasAlerted || al.id === id) {
				return false;
			}
			return true;
		});
		window.localStorage.setItem("coin_alerts", JSON.stringify(newAlerts));
		this.setState({
			priceAlerts: newAlerts
		});
	};

	// Handle updates to ticker time
	handleTickerTime = time => {
		this.setState({ tickerTime: time });
	};

	// Handle set ticker time
	handleSetTickerTime = time => {
		clearInterval(this.tickerInterval);
		window.localStorage.setItem("coin_ticker", time);
		this.tickerInterval = window.setInterval(
			this.getTickerInfo,
			time * 60 * 1000
		);
	};

	// Handle change of currency type and refresh numbers after change
	handleCurrencyTypeChange = type => {
		window.localStorage.setItem("currency_type", type.value);
		window.localStorage.setItem("locale_type", type.localeCode);
		this.setState(
			{
				currencyType: type.value,
				localeType: type.localeCode
			},
			() => {
				this.getTickerInfo();
			}
		);
	};

	// Handle close app event
	handleCloseApp = () => {
		app.quit();
	};

	// Handle rearranging tiles
	handleMoveTile = (dragIndex, hoverIndex) => {
		const { savedIds, myCurrencyList } = this.state;
		const dragTileItem = myCurrencyList[dragIndex];
		const dragIdItem = savedIds[dragIndex];

		this.setState(
			update(this.state, {
				myCurrencyList: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragTileItem]]
				},
				savedIds: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragIdItem]]
				}
			}),
			() => {
				window.localStorage.setItem("coin_ids", this.state.savedIds.join(";"));
			}
		);
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
								currencyType={this.state.currencyType}
								localeType={this.state.localeType}
								currencyList={this.state.myCurrencyList}
								globalInfo={this.state.globalInfo}
								timeFormat={this.state.timeFormat}
								onSwitchTime={this.switchTimeFormat}
								onCloseApp={this.handleCloseApp}
								onMoveTile={this.handleMoveTile}
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
								onToggleSavedId={this.handleToggleSavedId}
								savedIds={this.state.savedIds}
								priceAlerts={this.state.priceAlerts}
								onRemoveAlert={this.handleRemoveAlert}
							/>
						);
					}}
				/>
				<Route
					path="/alert/:id"
					render={props => {
						return (
							<ContentCreateAlert
								{...props}
								onRemoveAlert={this.handleRemoveAlert}
								onAddAlert={this.handleAddAlert}
							/>
						);
					}}
				/>
				<Route
					path="/settings"
					exact
					render={props => {
						return (
							<ContentSettings
								{...props}
								currencyList={this.state.fullCurrencyList}
								savedIds={this.state.savedIds}
								onSwitchTime={this.switchTimeFormat}
								priceAlerts={this.state.priceAlerts}
								onToggleSavedId={this.handleToggleSavedId}
								onUpdateTickerTime={this.handleTickerTime}
								onSetTickerTime={this.handleSetTickerTime}
								tickerTime={this.state.tickerTime}
								currencyType={this.state.currencyType}
								currencyTypeList={currencyTypes}
								onCurrencyTypeChange={this.handleCurrencyTypeChange}
							/>
						);
					}}
				/>
			</div>
		);
	}
}

export default App;
