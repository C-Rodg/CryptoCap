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
import {
	API_FULL_CRYPTO_LIST,
	API_GLOBAL_DATA,
	EXCHANGE_RATES,
	API_SAVED_CRYPTO_LIST
} from "../TEST/TEST_API";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			exchangeRates: EXCHANGE_RATES, //{},
			globalData: API_GLOBAL_DATA, // {},
			fullCryptoList: API_FULL_CRYPTO_LIST, //[],
			mySavedCryptos: API_SAVED_CRYPTO_LIST, //[],
			selectedFiatCurrency: "USD",
			selectedLocale: "en-US",
			backgroundTickerTime: 10
		};
	}

	// Quit button clicked
	handleCloseApp() {
		app.hide();
	}

	// Fiat Currency Type Changed
	handleCurrencyTypeChange = select => {
		console.log(select);
		this.setState({
			selectedFiatCurrency: select.value,
			selectedLocale: select.locale
		});
	};

	// Update state for backgroundTickerTime
	handleChangeTickerTime = time => {
		this.setState({ backgroundTickerTime: time });
	};

	// New backgroundTickerTime has been set
	handleSetTickerTime = time => {
		// TODO: CLEAR INTERVAL, save to local storage, etc.
	};

	// Handle moving of saved cryptos
	handleMovedCrypto = (dragIndex, hoverIndex) => {
		const { mySavedCryptos } = this.state;
		const dragTileItem = mySavedCryptos[dragIndex];

		this.setState(
			update(this.state, {
				mySavedCryptos: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragTileItem]]
				}
			})
		);
	};

	// Handle Toggling of saved crypto
	handleToggleSavedCoin = () => {
		console.log("TOGGLING CRYPTO");
	};

	// Remove price alert
	handleRemovePriceAlert = () => {
		console.log("REMOVING PRICE ALERT");
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
							/>
						);
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
