import React, { Component } from "react";
import InputRange from "react-input-range";
import Select from "react-select";
import "../styles/react-select.css";

import "../styles/input-slider.css";
import AddRemoveTile from "./AddRemoveTile";
import BackBtn from "./BackBtn";

import {
	Row,
	Col,
	NavTitle,
	SubTitle,
	SubTitleContainer,
	TimeSwitchContainer,
	InputBar,
	ScrollContent,
	TickerContainer,
	CurrencyTypeContainer
} from "./Styled";

class ContentSettings extends Component {
	state = {
		searchTerm: ""
	};

	// Render out currency list
	renderCryptoList = () => {
		const { savedIds, currencyList, priceAlerts } = this.props;
		if (currencyList && currencyList.length > 0) {
			const searchTerm = this.state.searchTerm.toUpperCase();
			const filteredList = currencyList.filter(coin => {
				return coin.name.toUpperCase().indexOf(searchTerm) > -1;
			});
			if (filteredList.length > 0) {
				return filteredList.map(coin => {
					// Check if it's saved and for price alerts
					let saved = false;
					let hasPriceAlert = false;
					if (savedIds.indexOf(coin.id) > -1) {
						saved = true;
						if (priceAlerts.find(i => i.id === coin.id && !i.hasAlerted)) {
							hasPriceAlert = true;
						}
					}
					return (
						<AddRemoveTile
							key={coin.id}
							name={coin.name}
							id={coin.id}
							isSelected={saved}
							toggleTile={this.props.onToggleSavedId}
							hasPriceAlert={hasPriceAlert}
						/>
					);
				});
			}
		}
		return <SubTitle className="m-10">-No Currencies Found-</SubTitle>;
	};

	render() {
		const timeFormat = window.localStorage.getItem("coin_time");
		const { onSwitchTime } = this.props;
		return (
			<div className="content-settings container">
				<NavTitle>
					Settings<BackBtn />
				</NavTitle>
				<Row>
					<Col>
						<SubTitle>Currencies:</SubTitle>
						<InputBar>
							<svg
								fill="#000000"
								height="24"
								viewBox="0 0 24 24"
								width="24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
								<path d="M0 0h24v24H0z" fill="none" />
							</svg>
							<input
								type="text"
								placeholder="search..."
								value={this.state.searchTerm}
								onChange={ev => this.setState({ searchTerm: ev.target.value })}
							/>
						</InputBar>
						<ScrollContent>{this.renderCryptoList()}</ScrollContent>
					</Col>
					<Col>
						<SubTitleContainer>
							<SubTitle>Default Time Format:</SubTitle>
							<TimeSwitchContainer>
								<a
									className={timeFormat === "1h" ? "active" : ""}
									onClick={() => onSwitchTime("1h", true)}
								>
									1hr
								</a>
								<a
									onClick={() => onSwitchTime("24h", true)}
									className={timeFormat === "24h" ? "active" : ""}
								>
									24hr
								</a>
								<a
									onClick={() => onSwitchTime("7d", true)}
									className={timeFormat === "7d" ? "active" : ""}
								>
									7d
								</a>
							</TimeSwitchContainer>
						</SubTitleContainer>
						<SubTitleContainer>
							<SubTitle>Currency:</SubTitle>
							<CurrencyTypeContainer>
								<Select
									options={this.props.currencyTypeList}
									value={this.props.currencyType}
									onChange={this.props.onCurrencyTypeChange}
									clearable={false}
									searchable={false}
								/>
							</CurrencyTypeContainer>
						</SubTitleContainer>
						<TickerContainer>
							<SubTitle className="m-b-25">Update Interval:</SubTitle>

							<InputRange
								formatLabel={value => `${value} mins`}
								minValue={1}
								maxValue={20}
								value={this.props.tickerTime}
								onChange={this.props.onUpdateTickerTime}
								onChangeComplete={this.props.onSetTickerTime}
							/>
						</TickerContainer>
					</Col>
				</Row>
			</div>
		);
	}
}

export default ContentSettings;
