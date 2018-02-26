import React, { Component } from "react";

import Title from "../Common/Title";
import { Container, GridTwoColContainer } from "../Common/Containers";
import { SubTitle } from "../Common/SubTitle";
import CoinGraphContainer from "./CoinGraphContainer";

class ContentGraph extends Component {
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

	render() {
		if (!this.props.location.state) {
			return this.renderEmptyCoin();
		}
		const { coin } = this.props.location.state;

		return (
			<Container>
				<Title
					text={coin.display_name || coin.id}
					showBack={true}
					icon={coin.id}
				/>
				<GridTwoColContainer>
					<div>
						<SubTitle>{coin.id}</SubTitle>
						<CoinGraphContainer
							id={coin.id}
							exchangeRates={this.props.exchangeRates}
							selectedFiatCurrency={this.props.selectedFiatCurrency}
						/>
					</div>
				</GridTwoColContainer>
			</Container>
		);
	}
}

export default ContentGraph;
