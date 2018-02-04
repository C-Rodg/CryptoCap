import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
const app = require("electron").remote.app;
import update from "immutability-helper";

import "../styles/default.css";
import ContentHome from "./ContentHome/ContentHome";
import ContentSettings from "./ContentSettings/ContentSettings";
import ContentPriceAlert from "./ContentPriceAlert/ContentPriceAlert";
import ContentCoin from "./ContentCoin/ContentCoin";

// TESTING
import { API_FULL_CRYPTO_LIST } from "../TEST/TEST_API";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			exchangeRates: {},
			fullCryptoList: API_FULL_CRYPTO_LIST, //[],
			mySavedCryptos: [],
			selectedFiatCurrency: "USD",
			backgroundTickerTime: 10
		};
	}

	// Quit button clicked
	handleCloseApp() {
		app.quit();
	}

	// Fiat Currency Type Changed
	handleCurrencyTypeChange = select => {
		this.setState({ selectedFiatCurrency: select.value });
	};

	// Update state for backgroundTickerTime
	handleChangeTickerTime = time => {
		this.setState({ backgroundTickerTime: time });
	};

	// New backgroundTickerTime has been set
	handleSetTickerTime = time => {
		// TODO: CLEAR INTERVAL, save to local storage, etc.
	};

	render() {
		return (
			<div className="app">
				<Route
					path="/"
					exact
					render={props => {
						return <ContentHome {...props} onCloseApp={this.handleCloseApp} />;
					}}
				/>
				<Route
					path="/crypto/:id"
					render={props => {
						return <ContentCoin {...props} />;
					}}
				/>
				<Route
					path="/alert/:id"
					render={props => {
						return <ContentPriceAlert {...props} />;
					}}
				/>
				<Route
					path="/settings"
					render={props => {
						return (
							<ContentSettings
								{...props}
								fullCryptoList={this.state.fullCryptoList}
								selectedFiatCurrency={this.state.selectedFiatCurrency}
								onCurrencyTypeChange={this.handleCurrencyTypeChange}
								backgroundTickerTime={this.state.backgroundTickerTime}
								onChangeTickerTime={this.handleChangeTickerTime}
								onSetTickerTime={this.handleSetTickerTime}
							/>
						);
					}}
				/>
			</div>
		);
	}
}

export default App;
