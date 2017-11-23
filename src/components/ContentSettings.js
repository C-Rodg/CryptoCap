import React, { Component } from "react";

import AddRemoveTile from "./AddRemoveTile";
import BackBtn from "./BackBtn";
import {
	Row,
	Col,
	NavTitle,
	SubTitle,
	SubTitleContainer,
	TimeSwitchContainer,
	Searchbar,
	ScrollContent
} from "./Styled";

class ContentSettings extends Component {
	state = {
		searchTerm: ""
	};

	// Render out currency list
	renderCurrencyList = () => {
		const { savedIds, currencyList } = this.props;
		if (currencyList && currencyList.length > 0) {
			const searchTerm = this.state.searchTerm.toUpperCase();
			const filteredList = currencyList.filter(coin => {
				return coin.name.toUpperCase().indexOf(searchTerm) > -1;
			});
			if (filteredList.length > 0) {
				return filteredList.map(coin => {
					let saved = false;
					if (savedIds.indexOf(coin.id) > -1) {
						saved = true;
					}
					return (
						<AddRemoveTile
							key={coin.id}
							name={coin.name}
							id={coin.id}
							isSelected={saved}
							toggleTile={this.props.onToggleSavedId}
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
						<Searchbar>
							<i className="material-icons">search</i>
							<input
								type="text"
								placeholder="search..."
								value={this.state.searchTerm}
								onChange={ev => this.setState({ searchTerm: ev.target.value })}
							/>
						</Searchbar>
						<ScrollContent>{this.renderCurrencyList()}</ScrollContent>
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
					</Col>
				</Row>
			</div>
		);
	}
}

export default ContentSettings;
