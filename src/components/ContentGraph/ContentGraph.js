// Libraries
import React, { Component } from 'react';

// Components
import Title from '../Common/Title';
import CoinGraphContainer from './CoinGraphContainer';

// Styled Components
import { Container, GridTwoColContainer } from '../Common/Containers';
import { SubTitle } from '../Common/SubTitle';

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
				<Title text={coin.name || coin.id} showBack={true} icon={coin.symbol} />
				<GridTwoColContainer>
					<div>
						<SubTitle>{coin.symbol}</SubTitle>
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
