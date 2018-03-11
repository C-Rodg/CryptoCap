// Libraries
import React, { Component } from "react";

// Components
import Title from "../Common/Title";
import CoinCard from "./CoinCard";
import CreatePriceButton from "./CreatePriceButton";
import SavedCoinToggleButton from "./SavedCoinToggleButton";
import SubContainer from "./SubContainer";

// Styled Components
import { Container, GridTwoColContainer } from "../Common/Containers";
import { SubTitle } from "../Common/SubTitle";

// Utilities
import { translateCurrency } from "../../utils/currency";

class ContentCoin extends Component {
	changedItemFlag = false;

	// If coin has been added, get new prices
	componentWillUnmount() {
		if (this.changedItemFlag) {
			this.props.getUpdates();
		}
	}

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

	// Toggle Saved Coin
	toggleSavedCoin = (id, isSaved) => () => {
		const strSaved = isSaved ? "true" : "false";
		if (!isSaved) {
			this.changedItemFlag = true;
		}
		this.props.onToggleSavedCoin(id, strSaved);
	};

	render() {
		if (!this.props.location.state) {
			return this.renderEmptyCoin();
		}

		const { coin } = this.props.location.state;
		const {
			mySavedCryptoIds,
			priceAlerts,
			exchangeRates,
			selectedFiatCurrency,
			selectedLocale
		} = this.props;

		const isSaved = mySavedCryptoIds.indexOf(coin.id) > -1 ? true : false;
		const priceAlertAbove = priceAlerts.find(
			p => p.coin === coin.id && !p.alertBelow
		);
		const priceAlertBelow = priceAlerts.find(
			p => p.coin === coin.id && p.alertBelow
		);
		const priceAbove = priceAlertAbove
			? translateCurrency(
					priceAlertAbove.priceUSD,
					selectedFiatCurrency,
					selectedLocale,
					exchangeRates
			  )
			: false;
		const priceBelow = priceAlertBelow
			? translateCurrency(
					priceAlertBelow.priceUSD,
					selectedFiatCurrency,
					selectedLocale,
					exchangeRates
			  )
			: false;

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
							exchangeRates={exchangeRates}
							selectedLocale={selectedLocale}
							selectedFiatCurrency={selectedFiatCurrency}
						/>
					</div>
					<div>
						<CreatePriceButton
							coin={coin}
							hasAlertBelow={priceBelow}
							hasAlertAbove={priceAbove}
							symbol={coin.id}
							onRemoveAlert={this.props.onRemoveAlert(coin.id)}
						/>
						<SavedCoinToggleButton
							isSaved={isSaved}
							onToggleSavedCoin={this.toggleSavedCoin(coin.id, isSaved)}
						/>
					</div>
				</GridTwoColContainer>
			</Container>
		);
	}
}

export default ContentCoin;
