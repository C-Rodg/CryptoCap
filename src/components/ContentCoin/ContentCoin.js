import React, { Component } from "react";

import Title from "../Common/Title";
import { Container, GridTwoColContainer } from "../Common/Containers";
import { SubTitle } from "../Common/SubTitle";
import CoinCard from "./CoinCard";
import CreatePriceButton from "./CreatePriceButton";
import SavedCoinToggleButton from "./SavedCoinToggleButton";
import SubContainer from "./SubContainer";

class ContentCoin extends Component {
	// No coin found
	renderEmptyCoin() {
		return (
			<Container>
				<Title text="CryptoCap" showBack={true} />
				<GridTwoColContainer>
					<div>
						<SubTitle> - No Currencies Found -</SubTitle>
					</div>
				</GridTwoColContainer>
			</Container>
		);
	}

	render() {
		if (!this.props.location.state) {
			return this.renderEmptyCoin();
		}

		const { coin } = this.props.location.state;

		const hasAlert = false;
		const isSaved = true;

		return (
			<Container>
				<Title
					text={coin.display_name || coin.id}
					showBack={true}
					icon={coin.id}
				/>
				<GridTwoColContainer>
					<div>
						<SubContainer id={coin.id} coin={coin} />
						<CoinCard
							price={coin.price_usd || coin.price}
							rank={coin.rank}
							priceBTC={coin.price_btc}
							change24={coin.cap24hrChange}
							vwap24={coin.vwap_h24}
							supply={coin.supply}
							volume={coin.volume}
							marketCap={coin.market_cap}
							exchangeRates={this.props.exchangeRates}
							selectedLocale={this.props.selectedLocale}
							selectedFiatCurrency={this.props.selectedFiatCurrency}
						/>
					</div>
					<div>
						<CreatePriceButton
							coin={coin}
							hasAlert={hasAlert}
							symbol={coin.id}
							onRemoveAlert={this.props.onRemoveAlert}
						/>
						<SavedCoinToggleButton
							isSaved={isSaved}
							onToggleSavedCoin={this.props.onToggleSavedCoin}
						/>
					</div>
				</GridTwoColContainer>
			</Container>
		);
	}
}

export default ContentCoin;
