// Libraries
import React, { Component } from "react";

// Components
import Title from "../Common/Title";
import PriceInput from "./PriceInput";
import AboveBelow from "./AboveBelow";
import SubmitButton from "./SubmitButton";

// Styled Components
import { Container, GridTwoColContainer } from "../Common/Containers";
import { SubTitle } from "../Common/SubTitle";
import { MessageContainer } from "./MessageContainer";

class ContentPriceAlert extends Component {
	state = {
		alertAmount: "",
		alertBelow: true,
		errorMessage: false,
		success: false
	};

	// No coin found..
	renderEmptyCoin() {
		return (
			<Container>
				<Title text="CryptoCap" showBack={true} />
				<GridTwoColContainer>
					<div>
						<SubTitle> - No Currencies Found -</SubTitle>
					</div>
				</GridTwoColContainer>
			</Container>
		);
	}

	// Create Price Submitted, validate...
	validateAlert = ev => {
		ev.preventDefault();

		if (!this.state.alertAmount) {
			this.setState({ errorMessage: "Please set a price..." });
			return false;
		}
		const amountFloat = parseFloat(this.state.alertAmount, 10);
		if (isNaN(amountFloat)) {
			this.setState({ errorMessage: "Please enter a valid price..." });
			return false;
		}

		const { coin } = this.props.location.state;
		const { selectedFiatCurrency, exchangeRates } = this.props;

		// Calculate price in USD
		let priceUSD = amountFloat;
		if (
			selectedFiatCurrency !== "USD" &&
			exchangeRates &&
			exchangeRates.rates &&
			exchangeRates.rates[selectedFiatCurrency]
		) {
			const rate = 1 / exchangeRates.rates[selectedFiatCurrency];
			priceUSD = amountFloat * rate;
		}

		// Create alert object
		const alertObject = {
			hasAlerted: false,
			alertBelow: this.state.alertBelow,
			priceUSD,
			coin: coin.id
		};

		this.props.onAddAlert(alertObject);
		this.setState({ success: true, errorMessage: false }, () => {
			setTimeout(() => {
				this.props.history.push("/");
			}, 1400);
		});
	};

	// Update Price Input
	handleUpdatePrice = ev => {
		this.setState({ alertAmount: ev.target.value });
	};

	// Change Above/Below Toggle
	handleUpdateAboveBelow = setAs => ev => {
		this.setState({
			alertBelow: setAs
		});
	};

	render() {
		if (!this.props.location.state) {
			return this.renderEmptyCoin();
		}

		const { coin } = this.props.location.state;

		return (
			<Container>
				<Title text="Create Price Alert" showBack={true} icon={coin.id} />
				<GridTwoColContainer>
					<div>
						<div>
							<SubTitle>{coin.display_name || coin.id}</SubTitle>
						</div>
						<AboveBelow
							alertBelow={this.state.alertBelow}
							onUpdateAboveBelow={this.handleUpdateAboveBelow}
						/>
						<div>
							<form onSubmit={this.validateAlert}>
								<PriceInput
									value={this.state.alertAmount}
									inPrice={this.props.selectedFiatCurrency}
									onUpdatePrice={this.handleUpdatePrice}
								/>
								{this.state.errorMessage && (
									<MessageContainer>
										<SubTitle className="percent-negative">
											{this.state.errorMessage}
										</SubTitle>
									</MessageContainer>
								)}
								{this.state.success && (
									<MessageContainer>
										<SubTitle className="percent-positive">
											Alert Successfully Created!
										</SubTitle>
									</MessageContainer>
								)}
								<SubmitButton />
							</form>
						</div>
					</div>
					<div />
				</GridTwoColContainer>
			</Container>
		);
	}
}

export default ContentPriceAlert;
