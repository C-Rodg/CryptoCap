import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
const app = require("electron").remote.app;
import update from "immutability-helper";

import "../styles/default.css";
import ContentHome from "./ContentHome";
import ContentSettings from "./ContentSettings";
import ContentPriceAlert from "./ContentPriceAlert";
import ContentCoin from "./ContentCoin";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			exchangeRates: {},
			fullCryptoList: [],
			mySavedCryptos: [],
			selectedFiatCurrency: "USD"
		};
	}

	render() {
		return (
			<div className="app">
				<Route
					path="/"
					exact
					render={props => {
						return <ContentHome {...props} />;
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
						return <ContentSettings {...props} />;
					}}
				/>
			</div>
		);
	}
}

export default App;
