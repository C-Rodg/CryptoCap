import React, { Component } from "react";
import styled from "styled-components";

import { Container, GridTwoColContainer } from "../Common/Containers";
import Title from "../Common/Title";
import { SubTitle } from "../Common/SubTitle";
import InputBar from "./InputBar";
import CryptoTile from "./CryptoTile";

import InputRange from "react-input-range";
import Select from "react-select";
import "../../styles/react-select.css";
import "../../styles/input-slider.css";
import { currencySelect } from "../../utils/currency";
import SearchList from "./SearchList";

const ScrollCryptoList = styled.div`
	overflow-y: auto;
	margin-top: 8px;
	height: calc(100% - 4.3rem);
`;

const CurrencySelectContainer = styled.div`
	display: flex;
	align-items: center;
	margin-top: 10px;

	.Select {
		flex: 1;
		max-width: 180px;
		margin-left: auto;
		.Select-control {
			background-color: #0e2c3b;
			color: #f5f5f5;
			border: 0;
			color: red;
			border-radius: 15px;
		}
	}
`;

const InputSliderContainer = styled.div`
	margin-top: 13px;

	> span {
		display: block;
		margin-bottom: 25px;
	}
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
			return (
				<SearchList searchTerm={searchTerm} fullCryptoList={fullCryptoList} />
			);
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
						<SubTitle>Cryptocurrencies:</SubTitle>
						<InputBar
							value={this.state.searchTerm}
							onUpdateSearchTerm={this.handleUpdateSearchTerm}
						/>
						<ScrollCryptoList onClick={this.onCryptoToggle}>
							{this.renderFullCryptoList()}
						</ScrollCryptoList>
					</div>
					<div>
						<CurrencySelectContainer>
							<SubTitle>Fiat Currency:</SubTitle>
							<Select
								options={currencySelect}
								value={this.props.selectedFiatCurrency}
								onChange={this.props.onCurrencyTypeChange}
								clearable={false}
								searchable={false}
							/>
						</CurrencySelectContainer>
						<InputSliderContainer>
							<SubTitle>Update Interval:</SubTitle>
							<InputRange
								formatLabel={value => `${value} mins`}
								minValue={1}
								maxValue={20}
								value={this.props.backgroundTickerTime}
								onChange={this.props.onChangeTickerTime}
								onChangeComplete={this.props.onSetTickerTime}
							/>
						</InputSliderContainer>
					</div>
				</GridTwoColContainer>
			</Container>
		);
	}
}

export default ContentSettings;
