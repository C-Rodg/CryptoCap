// Libraries
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import Select from 'react-select';
import CoinGraph from './CoinGraph';

// Styled Components
import { SelectContainer } from '../Common/SelectContainer';
import { SubTitle } from '../Common/SubTitle';

// Utilities
import { getCoinHistory } from '../../utils/cryptoApi';

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

// Interval & Timeline Options
const intervalOptions = [
	{ value: 'm1', label: '1 minute' },
	{ value: 'm5', label: '5 minutes' },
	{ value: 'm15', label: '15 minutes' },
	{ value: 'm30', label: '30 minutes' },
	{ value: 'h1', label: '1 hour' },
	{ value: 'h2', label: '2 hours' },
	{ value: 'h6', label: '6 hours' },
	{ value: 'h12', label: '12 hours' },
	{ value: 'd1', label: '1 day' }
];
const timelineOptions = [
	{ value: '60', label: '1 hour', allowed: ['m1', 'm5', 'm15'] },
	{
		value: '720',
		label: '12 hours',
		allowed: ['m1', 'm5', 'm15', 'm30', 'h1', 'h2']
	},
	{
		value: '1440',
		label: '1 day',
		allowed: ['m1', 'm5', 'm15', 'm30', 'h1', 'h2', 'h6']
	},
	{
		value: '4320',
		label: '3 days',
		allowed: ['m5', 'm15', 'm30', 'h1', 'h2', 'h6']
	},
	{
		value: '10080',
		label: '1 week',
		allowed: ['m15', 'm30', 'h1', 'h2', 'h6', 'h12', 'd1']
	},
	{
		value: '20160',
		label: '2 weeks',
		allowed: ['m30', 'h1', 'h2', 'h6', 'h12', 'd1']
	},
	{
		value: '43200',
		label: '1 month',
		allowed: ['h1', 'h2', 'h6', 'h12', 'd1']
	},
	{
		value: '86400',
		label: '2 months',
		allowed: ['h2', 'h6', 'h12', 'd1']
	},
	{
		value: '259200',
		label: '6 months',
		allowed: ['h6', 'h12', 'd1']
	},
	{
		value: '525600',
		label: '1 year',
		allowed: ['h12', 'd1']
	}
];

class CoinGraphContainer extends Component {
	state = {
		selectedInterval: 'm30',
		selectedTimeline: '20160',
		filteredTimelineOptions: [],
		formattedGraphData: [],
		isLoading: true
	};

	componentDidMount() {
		// Get Initial Graph Data
		this.getChartData(
			this.props.id,
			this.state.selectedInterval,
			this.state.selectedTimeline
		);
		this.setTimelineOptions();
	}

	setTimelineOptions = () => {
		let isFound = false;
		const { selectedInterval, selectedTimeline } = this.state;
		const newTimelineOptions = timelineOptions.filter(timelineOpt => {
			if (~timelineOpt.allowed.indexOf(selectedInterval)) {
				if (timelineOpt.value === selectedTimeline) {
					isFound = true;
				}
				return true;
			}
			return false;
		});

		this.setState({
			selectedTimeline: isFound
				? selectedTimeline
				: newTimelineOptions[0].value,
			filteredTimelineOptions: newTimelineOptions
		});
	};

	// Format Graph Data for RechartJS
	formatGraphData = graphData => {
		const { selectedFiatCurrency, exchangeRates } = this.props;
		let dataObject = graphData || [];
		dataObject = dataObject.map(responseItem => {
			return {
				type: 'Price',
				time: responseItem.time,
				value: responseItem.priceUsd,
				date: responseItem.date
			};
		});

		if (
			selectedFiatCurrency !== 'USD' &&
			exchangeRates &&
			exchangeRates.rates[selectedFiatCurrency]
		) {
			const rate = parseFloat(exchangeRates.rates[selectedFiatCurrency]);
			dataObject = dataObject.map(convertedItem => {
				return {
					...convertedItem,
					value: rate * parseFloat(convertedItem.value)
				};
			});
		}

		return dataObject;
	};

	handleUpdateInterval = ev => {
		this.setState(
			{
				selectedInterval: ev.value
			},
			() => {
				this.setTimelineOptions();
			}
		);
	};

	handleUpdateTimeline = ev => {
		this.setState({
			selectedTimeline: ev.value
		});
	};

	startRequestForChartData = () => {
		this.getChartData(
			this.props.id,
			this.state.selectedInterval,
			this.state.selectedTimeline
		);
	};

	getChartData = (id, interval, start) => {
		this.setState({ isLoading: true }, () => {
			getCoinHistory(id, interval, start)
				.then(resp => {
					this.setState({
						formattedGraphData: this.formatGraphData(resp.data.data),
						selectedTimeline: start,
						selectedInterval: interval,
						isLoading: false
					});
				})
				.catch(() => this.setState({ isLoading: false }));
		});
	};

	render() {
		return (
			<div>
				<StyledInlineSelects>
					<SelectContainer>
						<SubTitle>Interval:</SubTitle>
						<Select
							options={intervalOptions}
							value={this.state.selectedInterval}
							onChange={this.handleUpdateInterval}
							clearable={false}
							searchable={false}
						/>
					</SelectContainer>
					<SelectContainer>
						<SubTitle>Past:</SubTitle>
						<Select
							options={this.state.filteredTimelineOptions}
							value={this.state.selectedTimeline}
							onChange={this.handleUpdateTimeline}
							clearable={false}
							searchable={false}
						/>
					</SelectContainer>
					<SelectContainer>
						<button type="button" onClick={this.startRequestForChartData}>
							Update
						</button>
					</SelectContainer>
				</StyledInlineSelects>

				<CoinGraph
					data={this.state.formattedGraphData}
					selectedTimeline={this.state.selectedTimeline}
					selectedInterval={this.state.selectedInterval}
					isLoading={this.state.isLoading}
				/>
			</div>
		);
	}
}

export default CoinGraphContainer;
