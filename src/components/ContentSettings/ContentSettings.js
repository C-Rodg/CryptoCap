import React, { Component } from "react";
import styled from "styled-components";

import { Container, GridTwoColContainer } from "../Common/Containers";
import Title from "../Common/Title";
import { SubTitle } from "../Common/SubTitle";
import InputBar from "./InputBar";
import CryptoTile from "./CryptoTile";

const ScrollCryptoList = styled.div`
	overflow-y: auto;
	margin-top: 8px;
	height: calc(100% - 4.3rem);
`;

class ContentSettings extends Component {
	state = { searchTerm: "" };

	// Update search term
	handleUpdateSearchTerm = ev => {
		this.setState({
			searchTerm: ev.target.value
		});
	};

	// Render list of all cryptos
	renderFullCryptoList() {
		const { fullCryptoList } = this.props;
		if (fullCryptoList && fullCryptoList.length > 0) {
			const searchTerm = this.state.searchTerm.toUpperCase();
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
		}
		return <SubTitle> - No Currencies Found -</SubTitle>;
	}

	// Crypto Tile clicked
	onCryptoToggle = ev => {
		if (ev.target && ev.target.dataset && ev.target.dataset.cryptoid) {
			// Handle saving / removing crypto + alerts
		}
	};

	render() {
		return (
			<Container>
				<Title text="Settings" showBack={true} />
				<GridTwoColContainer>
					<div>
						<SubTitle>Currencies:</SubTitle>
						<InputBar
							value={this.state.searchTerm}
							onUpdateSearchTerm={this.handleUpdateSearchTerm}
						/>
						<ScrollCryptoList onClick={this.onCryptoToggle}>
							{this.renderFullCryptoList()}
						</ScrollCryptoList>
					</div>
					<div>Right</div>
				</GridTwoColContainer>
			</Container>
		);
	}
}

export default ContentSettings;
