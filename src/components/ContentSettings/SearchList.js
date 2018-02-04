import React, { Component } from "react";
import CryptoTile from "./CryptoTile";
class SearchList extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.searchTerm === nextProps.searchTerm) {
			return false;
		}
		return true;
	}

	render() {
		const { searchTerm, fullCryptoList } = this.props;
		const filteredList = fullCryptoList.filter(coin => {
			if (coin.name && coin.name.toUpperCase().indexOf(searchTerm) > -1) {
				return true;
			} else if (
				coin.symbol &&
				coin.symbol.toUpperCase().indexOf(searchTerm) > -1
			) {
				return true;
			}
			return false;
		});

		if (filteredList.length > 0) {
			return filteredList.map(coin => {
				// TODO: check for saved and price alerts
				let isSelected = false;
				let hasPriceAlert = false;
				return (
					<CryptoTile
						key={coin.symbol}
						symbol={coin.symbol}
						name={coin.name}
						isSelected={isSelected}
						hasPriceAlert={hasPriceAlert}
					/>
				);
			});
		}
		return null;
	}
}

export default SearchList;
