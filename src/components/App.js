import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import "../styles/default.css";
import ContentHome from "./ContentHome";
import ContentCoin from "./ContentCoin";
import ContentSettings from "./ContentSettings";

class App extends Component {
	constructor() {
		super();
		const time = window.localStorage.getItem("coin_time");
		const coinIds = window.localStorage.getItem("coin_ids");
		let savedIds = "bitcoin;ethereum;bitcoin-cash;ripple;litecoin;monero";
		if (coinIds) {
			savedIds = coinIds;
		}
		this.state = {
			fullCurrencyList: [],
			myCurrencyList: [],
			savedIds: savedIds.split(";"),
			globalInfo: {},
			timeFormat: time ? time : "24h"
		};

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
		const { savedIds, fullCurrencyList } = this.state;
		let newSavedIds = [];
		if (savedIds.indexOf(id) > -1) {
			newSavedIds = savedIds.filter(oldId => oldId !== id);
		} else {
			newSavedIds = [...savedIds, id];
		}
		window.localStorage.setItem("coin_ids", newSavedIds.join(";"));

		this.setState({
			savedIds: newSavedIds,
			myCurrencyList: fullCurrencyList.filter(
				coin => newSavedIds.indexOf(coin.id) > -1
			)
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
						return <ContentCoin {...props} />;
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
