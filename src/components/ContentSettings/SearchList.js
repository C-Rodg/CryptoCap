import React, { Component } from "react";
import CryptoTile from "./CryptoTile";
class SearchList extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.props.searchTerm === nextProps.searchTerm &&
			this.props.savedCryptoIds.length === nextProps.savedCryptoIds.length
		) {
			return false;
		}
		return true;
	}

	render() {
		const { searchTerm, fullCryptoList, savedCryptoIds } = this.props;
		const filteredList = fullCryptoList
			.filter(coin => {
				if (coin.name && coin.name.toUpperCase().indexOf(searchTerm) > -1) {
					return true;
				} else if (
					coin.symbol &&
					coin.symbol.toUpperCase().indexOf(searchTerm) > -1
				) {
					return true;
				}
				return false;
			})
			.sort((coinA, coinB) => {
				if (coinA.symbol > coinB.symbol) {
					return 1;
				} else if (coinA.symbol < coinB.symbol) {
					return -1;
				}
				return 0;
			});

		if (filteredList.length > 0) {
			return filteredList.map(coin => {
				// TODO: check  price alerts
				let isSelected =
					savedCryptoIds.indexOf(coin.symbol) === -1 ? false : true;
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
