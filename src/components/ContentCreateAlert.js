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
		const setPrice = this.state.alertCost;
		const pureNum = parseFloat(setPrice, 10);
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

	// Update price input
	updatePriceInput = ev => {
		this.setState({ alertCost: ev.target.value });
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
								<span>{coin.currencyType}</span>
								<input
									type="text"
									placeholder="Alert me at a price below..."
									value={this.state.alertCost}
									onChange={this.updatePriceInput}
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
