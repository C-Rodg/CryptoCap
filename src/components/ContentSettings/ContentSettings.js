// Libraries
import React, { Component } from "react";
import styled from "styled-components";

// Components
import Title from "../Common/Title";
import InputBar from "./InputBar";
import CryptoTile from "./CryptoTile";
import InputRange from "react-input-range";
import Select from "react-select";
import SearchList from "./SearchList";

// Styled Components
import { Container, GridTwoColContainer } from "../Common/Containers";
import { SelectContainer } from "../Common/SelectContainer";
import { SubTitle } from "../Common/SubTitle";

// Utilities
import { currencySelect } from "../../utils/currency";

// Styles
import "../../styles/react-select.css";
import "../../styles/input-slider.css";

const ScrollCryptoList = styled.div`
	overflow-y: auto;
	margin-top: 8px;
	height: calc(100% - 4.3rem);
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
	changedItemFlag = false;

	componentWillMount() {
		console.log("MOUNTING...");
	}

	componentWillUnmount() {
		// If items have changed, update
		if (this.changedItemFlag) {
			this.props.getUpdates();
		}
	}

	// Update search term
	handleUpdateSearchTerm = ev => {
		this.setState({
			searchTerm: ev.target.value
		});
	};

	// Render list of all cryptos
	renderFullCryptoList() {
		const { fullCryptoList, savedCryptoIds, priceAlerts } = this.props;
		if (fullCryptoList && fullCryptoList.length > 0) {
			const searchTerm = this.state.searchTerm.toUpperCase();
			return (
				<SearchList
					searchTerm={searchTerm}
					fullCryptoList={fullCryptoList}
					savedCryptoIds={savedCryptoIds}
					priceAlerts={priceAlerts}
				/>
			);
		}
		return <SubTitle> - No Currencies Found -</SubTitle>;
	}

	// Crypto Tile clicked
	onCryptoToggle = ev => {
		const { target: { dataset } } = ev;
		if (dataset && dataset.cryptoid && dataset.selected) {
			// Handle saving / removing crypto + alerts
			this.changedItemFlag = true;
			this.props.onToggleCoin(dataset.cryptoid, dataset.selected);
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
						<SelectContainer>
							<SubTitle>Fiat Currency:</SubTitle>
							<Select
								options={currencySelect}
								value={this.props.selectedFiatCurrency}
								onChange={this.props.onCurrencyTypeChange}
								clearable={false}
								searchable={false}
							/>
						</SelectContainer>
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
