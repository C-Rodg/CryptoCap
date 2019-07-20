// Libraries
import React, { Component } from 'react';

// Components
import CryptoTile from './CryptoTile';

class SearchList extends Component {
	render() {
		const {
			searchTerm,
			fullCryptoList,
			savedCryptoIds,
			priceAlerts
		} = this.props;

		let filteredList = fullCryptoList;
		if (searchTerm) {
			filteredList = filteredList.filter(coin => {
				if (coin.name && ~coin.name.toUpperCase().indexOf(searchTerm)) {
					return true;
				} else if (
					coin.symbol &&
					~coin.symbol.toUpperCase().indexOf(searchTerm)
				) {
					return true;
				}
				return false;
			});
		}
		filteredList = filteredList.sort((coinA, coinB) => {
			if (coinA.name > coinB.name) {
				return 1;
			} else if (coinA.name < coinB.name) {
				return -1;
			}
			return 0;
		});

		if (filteredList.length > 0) {
			return filteredList.map(coin => {
				const isSelected =
					savedCryptoIds.indexOf(coin.id) === -1 ? false : true;
				const hasPriceAlert = priceAlerts.find(alert => alert.coin === coin.id);
				return (
					<CryptoTile
						key={coin.symbol}
						symbol={coin.symbol}
						identifier={coin.id}
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
