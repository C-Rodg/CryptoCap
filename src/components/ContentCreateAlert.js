import React, { Component } from "react";

import BackBtn from "./BackBtn";

import {
	NavTitle,
	Row,
	Col,
	SubTitle,
	InputBar,
	StyledSubmit,
	ErrorMsg,
	SuccessMsg
} from "./Styled";

class ContentCreateAlert extends Component {
	state = {
		alertCost: "",
		errorMsg: "",
		success: false
	};

	// Handle form submission
	validateAlert = ev => {
		ev.preventDefault();

		if (!this.state.alertCost) {
			this.setState({
				errorMsg: "Please set a price."
			});
			return false;
		}

		const stripDec = this.state.alertCost.split(".");
		const stripChars = stripDec[0].replace(/\D/g, "");
		const pureNum = parseInt(stripChars, 10);
		if (isNaN(pureNum)) {
			this.setState({
				errorMsg: "Invalid price alert value."
			});
			return false;
		}

		const obj = {
			hasAlerted: false,
			price: pureNum,
			id: this.props.location.state.coin.id
		};
		this.props.onAddAlert(obj);
		this.setState({ success: true, errorMsg: "" }, () => {
			setTimeout(() => {
				this.props.history.push("/");
			}, 800);
		});
	};

	render() {
		// No coin selected
		if (!this.props.location.state) {
			return (
				<div className="content-create-alert container">
					<NavTitle>
						Create Price Alert <BackBtn />
					</NavTitle>
					<Row>
						<Col>
							<SubTitle>-no currency selected-</SubTitle>
						</Col>
					</Row>
				</div>
			);
		}
		const { coin } = this.props.location.state;
		return (
			<div className="content-create-alert container">
				<NavTitle>
					<span className={["currency-icon", `i-${coin.id}`].join(" ")} />
					Create Price Alert
					<BackBtn />
				</NavTitle>
				<Row>
					<Col>
						<SubTitle>{coin.name}</SubTitle>
						<form onSubmit={this.validateAlert} className="text-center">
							<InputBar>
								<svg
									fill="#000000"
									height="24"
									viewBox="0 0 24 24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
									<path d="M0 0h24v24H0z" fill="none" />
								</svg>
								<input
									type="text"
									placeholder="Alert me at a price below..."
									value={this.state.alertCost}
									onChange={ev => this.setState({ alertCost: ev.target.value })}
								/>
							</InputBar>
							{this.state.errorMsg && (
								<ErrorMsg>{this.state.errorMsg}</ErrorMsg>
							)}
							{this.state.success && (
								<SuccessMsg>Successfully created alert!</SuccessMsg>
							)}
							<StyledSubmit type="submit">Create Alert!</StyledSubmit>
						</form>
					</Col>
				</Row>
			</div>
		);
	}
}

export default ContentCreateAlert;
