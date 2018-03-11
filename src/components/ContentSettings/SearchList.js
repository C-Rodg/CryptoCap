// Libraries
import React, { Component } from "react";

// Components
import CryptoTile from "./CryptoTile";

class SearchList extends Component {
	render() {
		const {
			searchTerm,
			fullCryptoList,
			savedCryptoIds,
			priceAlerts
		} = this.props;
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
				const isSelected =
					savedCryptoIds.indexOf(coin.symbol) === -1 ? false : true;
				const hasPriceAlert = priceAlerts.find(
					alert => alert.coin === coin.symbol
				);
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
