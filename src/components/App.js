import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import "../styles/default.css";
import ContentHome from "./ContentHome";
import ContentCoin from "./ContentCoin";
import ContentSettings from "./ContentSettings";

class App extends Component {
	state = {
		fullCurrencyList: [],
		myCurrencyList: [],
		savedIds: ["bitcoin", "ethereum", "monero"],
		globalInfo: {},
		timeFormat: "7d" // '24h', '1h'
	};

	componentDidMount() {
		this.getCompleteTicker();
		this.getGlobalInfo();
	}

	// Get Complete list of markets
	getCompleteTicker() {
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
	}

	// Get specific currency
	getOneTicker(id) {
		axios
			.get(`https://api.coinmarketcap.com/v1/ticker/${id}`)
			.then(resp => {
				console.log(resp);
			})
			.catch(err => {
				console.log(err);
			});
	}

	// Get global information
	getGlobalInfo() {
		axios
			.get("https://api.coinmarketcap.com/v1/global/")
			.then(resp => {
				console.log(resp.data);
				this.setState({ globalInfo: resp.data });
			})
			.catch(err => {
				console.log(err);
			});
	}

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
						return <ContentSettings {...props} />;
					}}
				/>
			</div>
		);
	}
}

export default App;
