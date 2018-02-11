import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import CurrencyTile from "./CurrencyTile";

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
			<div>
				{mySavedCryptos.map((curr, i) => (
					<CurrencyTile
						key={curr.id}
						moveCard={onMovedCrypto}
						index={i}
						exchangeRates={exchangeRates}
						selectedFiatCurrency={selectedFiatCurrency}
						selectedLocale={selectedLocale}
						name={curr.display_name}
						symbol={curr.id}
						change={curr.cap24hrChange}
						price={curr.price_usd}
					/>
				))}
			</div>
		);
	}
}
