import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import "../styles/default.css";
import ContentHome from "./ContentHome";
import ContentCoin from "./ContentCoin";
import ContentSettings from "./ContentSettings";
import ContentCreateAlert from "./ContentCreateAlert";

const samplePriceAlerts = [
	{ id: "bitcoin", price: 4200, hasAlerted: false },
	{ id: "ripple", price: 30, hasAlerted: false },
	{ id: "ethereum", price: 400, hasAlerted: false }
];

class App extends Component {
	constructor() {
		super();

		// Get saved settings - coins, time format, and alerts
		const time = window.localStorage.getItem("coin_time");
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

		// Set app state
		this.state = {
			fullCurrencyList: [],
			myCurrencyList: [],
			savedIds: savedIds.split(";"),
			globalInfo: {},
			timeFormat: time ? time : "24h",
			priceAlerts: samplePriceAlerts // TESTING
		};

		// Check for new data at set time
		this.tickerInterval = window.setInterval(this.getTickerInfo, 120000);
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
		this.getCompleteTicker();
		this.getGlobalInfo();
	};

	// Get Complete list of markets
	getCompleteTicker = () => {
		axios
			.get("https://api.coinmarketcap.com/v1/ticker/")
			.then(resp => {
				console.log(resp.data);
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

	// Get global information
	getGlobalInfo = () => {
		axios
			.get("https://api.coinmarketcap.com/v1/global/")
			.then(resp => {
				console.log(resp.data);
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
							/>
						);
					}}
				/>
			</div>
		);
	}
}

export default App;
