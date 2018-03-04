// Libraries
import React, { Component } from "react";
import styled from "styled-components";

// Components
import Select from "react-select";
import CoinGraph from "./CoinGraph";

// Styled Components
import { SelectContainer } from "../Common/SelectContainer";
import { SubTitle } from "../Common/SubTitle";

// Utilities
import { getCoinHistory } from "../../utils/cryptoApi";

// Styles
const StyledInlineSelects = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-bottom: 20px;

	> div {
		flex: 1;

		.Select {
			margin-left: 15px;
		}
	}
`;

// Timeline Select
const timelineOptions = [
	{ value: "1day", label: "24 hours" },
	{ value: "7day", label: "7 days" },
	{ value: "30day", label: "1 month" },
	{ value: "90day", label: "3 months" },
	{ value: "180day", label: "6 months" },
	{ value: "365day", label: "1 year" }
];

// Data Select
const dataOptions = [
	{ value: "price", label: "Price" },
	{ value: "market_cap", label: "Market Cap" },
	{ value: "volume", label: "Volume" }
];

class CoinGraphContainer extends Component {
	state = {
		selectedTimeline: "1day",
		selectedData: "price",
		formattedGraphData: {},
		isLoading: true
	};
	_apiGraphData = {};

	componentDidMount() {
		// Get Initial Graph Data
		getCoinHistory(this.state.selectedTimeline, this.props.id)
			.then(resp => {
				this._apiGraphData[this.state.selectedTimeline] = resp.data;
				this.setState({
					isLoading: false,
					formattedGraphData: this.formatGraphData(
						this._apiGraphData[this.state.selectedTimeline]
					)
				});
			})
			.catch(() => {
				this.setState({
					isLoading: false
				});
			});
	}

	// Format Graph Data for RechartJS
	formatGraphData = graphData => {
		if (graphData) {
			let price = graphData.price.map(formatGraphDataHelper("Price"));
			let market_cap = graphData.market_cap.map(
				formatGraphDataHelper("Market Cap")
			);
			const { selectedFiatCurrency, exchangeRates } = this.props;
			if (
				selectedFiatCurrency !== "USD" &&
				exchangeRates &&
				exchangeRates.rates[selectedFiatCurrency]
			) {
				price = price.map(
					convertUSDdata(exchangeRates.rates[selectedFiatCurrency])
				);

				market_cap = market_cap.map(
					convertUSDdata(exchangeRates.rates[selectedFiatCurrency])
				);
			}
			const volume = graphData.volume.map(formatGraphDataHelper("Volume"));
			[price, market_cap, volume].forEach(arr => arr.pop());
			const obj = {
				price,
				market_cap,
				volume
			};
			return obj;
		}
		return {};
	};

	// Change Selected Data
	handleChangeSelectData = ev => {
		this.setState({ selectedData: ev.value });
	};

	// Change the Time Format
	handleChangeTimeFormat = ev => {
		if (!this._apiGraphData[ev.value]) {
			this.setState(
				{
					isLoading: true
				},
				() => {
					getCoinHistory(ev.value, this.props.id)
						.then(resp => {
							const { _apiGraphData } = this;
							_apiGraphData[ev.value] = resp.data;

							this.setState({
								formattedGraphData: this.formatGraphData(
									_apiGraphData[ev.value]
								),
								selectedTimeline: ev.value,
								isLoading: false
							});
						})
						.catch(() => this.setState({ isLoading: false }));
				}
			);
		} else {
			this.setState({
				selectedTimeline: ev.value,
				formattedGraphData: this.formatGraphData(this._apiGraphData[ev.value])
			});
		}
	};

	render() {
		return (
			<div>
				<StyledInlineSelects>
					<SelectContainer>
						<SubTitle>Graph Data:</SubTitle>
						<Select
							options={dataOptions}
							value={this.state.selectedData}
							onChange={this.handleChangeSelectData}
							clearable={false}
							searchable={false}
						/>
					</SelectContainer>

					<SelectContainer>
						<SubTitle>Timeline:</SubTitle>
						<Select
							options={timelineOptions}
							value={this.state.selectedTimeline}
							onChange={this.handleChangeTimeFormat}
							clearable={false}
							searchable={false}
						/>
					</SelectContainer>
				</StyledInlineSelects>

				<CoinGraph
					data={this.state.formattedGraphData[this.state.selectedData]}
					selectedData={this.state.selectedData}
					selectedTimeline={this.state.selectedTimeline}
					isLoading={this.state.isLoading}
				/>
			</div>
		);
	}
}

// HELPER - Format Graph Data objects
const formatGraphDataHelper = type => tup => {
	return {
		type,
		time: tup[0],
		value: tup[1]
	};
};

// HELPER - convert USD to other currency
const convertUSDdata = fiat => obj => {
	return Object.assign({}, obj, { value: fiat * obj.value });
};

export default CoinGraphContainer;
