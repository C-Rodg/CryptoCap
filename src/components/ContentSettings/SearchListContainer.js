// Libraries
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import SearchList from './SearchList';

// Styled Components
import { SubTitle } from '../Common/SubTitle';

// Styles
const ScrollCryptoList = styled.div`
	overflow-y: auto;
	margin-top: 8px;
	height: calc(100% - 4.3rem);
`;

class SearchListContainer extends Component {
	// Determine if list needs to be rerendered
	shouldComponentUpdate(nextProps) {
		if (
			this.props.searchTerm === nextProps.searchTerm &&
			this.props.savedCryptoIds.length === nextProps.savedCryptoIds.length
		) {
			return false;
		}
		return true;
	}

	renderFullCryptoList() {
		const {
			fullCryptoList,
			savedCryptoIds,
			priceAlerts,
			searchTerm
		} = this.props;
		if (fullCryptoList && fullCryptoList.length > 0) {
			const newSearchTerm = searchTerm.toUpperCase();
			return (
				<SearchList
					searchTerm={newSearchTerm}
					fullCryptoList={fullCryptoList}
					savedCryptoIds={savedCryptoIds}
					priceAlerts={priceAlerts}
				/>
			);
		}
		return <SubTitle> - No Currencies Found -</SubTitle>;
	}

	render() {
		return (
			<ScrollCryptoList onClick={this.props.onCryptoToggle}>
				{this.renderFullCryptoList()}
			</ScrollCryptoList>
		);
	}
}

export default SearchListContainer;
