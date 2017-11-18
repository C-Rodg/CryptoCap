import React, { Component } from "react";

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
				<div className="taskbar-app">Taskbar application here!</div>
			</div>
		);
	}
}

export default App;
