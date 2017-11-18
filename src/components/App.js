import React, { Component } from "react";
import { Route } from "react-router-dom";

import "../styles/default.css";
import ContentHome from "./ContentHome";
import ContentCoin from "./ContentCoin";
import ContentSettings from "./ContentSettings";

class App extends Component {
	constructor() {
		super();
		console.log("new App component");
	}

	componentDidMount() {
		console.log("mounted!");
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
