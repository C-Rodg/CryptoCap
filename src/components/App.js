import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
const numeral = require("numeral");

import "../styles/default.css";
import ContentHome from "./ContentHome";
import ContentCoin from "./ContentCoin";
import ContentSettings from "./ContentSettings";
import ContentCreateAlert from "./ContentCreateAlert";
import { clearInterval } from "timers";

class App extends Component {
	constructor() {
		super();

		// Get saved settings - coins, time format, ticker time, and alerts
		const time = window.localStorage.getItem("coin_time");
		const tickerInt = window.localStorage.getItem("coin_ticker");
		const coinIds = window.localStorage.getItem("coin_ids");
		let savedIds = "bitcoin;ethereum;bitcoin-cash;ripple;litecoin;monero";
		if (coinIds) {
			savedIds = coinIds;
		}
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
			tickerTime
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
			.get("https://api.coinmarketcap.com/v1/ticker/")
			.then(resp => {
				this.createPriceNotification(resp.data);
				this.setState({
					fullCurrencyList: resp.data,
					myCurrencyList: resp.data.filter(
						curr => this.state.savedIds.indexOf(curr.id) > -1
					)
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	// Create notifications for price alerts
	createPriceNotification = currencyList => {
		const notifications = [];
		this.state.priceAlerts.forEach(al => {
			if (!al.hasAlerted) {
				const currency = currencyList.find(curr => curr.id === al.id);
				// If alert id doesn't exist in full currency list, delete..
				if (!currency) {
					al.hasAlerted = true;
					return false;
				}
				// If alert price < current price
				if (parseFloat(currency.price_usd, 10) <= al.price) {
					notifications.push(
						`${currency.name} is below ${numeral(al.price).format("$0,0.00")}.`
					);
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
			.get("https://api.coinmarketcap.com/v1/global/")
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
			myCurrencyList: fullCurrencyList.filter(
				coin => newSavedIds.indexOf(coin.id) > -1
			),
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
								currencyList={this.state.myCurrencyList}
								globalInfo={this.state.globalInfo}
								timeFormat={this.state.timeFormat}
								onSwitchTime={this.switchTimeFormat}
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
							/>
						);
					}}
				/>
			</div>
		);
	}
}

export default App;
