// Libraries
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import styled from 'styled-components';

// Components
import CurrencyTile from './CurrencyTile';

// Styles
const StyledScrollContainer = styled.div`
	overflow-y: auto;
	height: calc(100% - 1.2rem);
`;

@DragDropContext(HTML5Backend)
export default class SavedCryptosContainer extends Component {
	render() {
		const {
			exchangeRates,
			selectedFiatCurrency,
			selectedLocale,
			mySavedCryptos,
			onMovedCrypto
		} = this.props;
		return (
			<StyledScrollContainer>
				{mySavedCryptos.map((curr, i) => (
					<CurrencyTile
						key={curr.id}
						id={curr.id}
						moveCard={onMovedCrypto}
						index={i}
						exchangeRates={exchangeRates}
						selectedFiatCurrency={selectedFiatCurrency}
						selectedLocale={selectedLocale}
						name={curr.name}
						symbol={curr.symbol}
						change={curr.changePercent24Hr}
						price={curr.priceUsd}
						coin={curr}
					/>
				))}
			</StyledScrollContainer>
		);
	}
}
