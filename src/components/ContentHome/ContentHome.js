// Libraries
import React from "react";

// Components
import Title from "../Common/Title";
import GlobalCard from "./GlobalCard";
import LastUpdateTimeBlock from "../Common/LastUpdateTimeBlock";
import SavedCryptosContainer from "./SavedCryptosContainer";

// Styled Components
import { Container, GridTwoColContainer } from "../Common/Containers";
import { SubTitle } from "../Common/SubTitle";

const ContentHome = ({
	onCloseApp,
	exchangeRates,
	selectedFiatCurrency,
	selectedLocale,
	globalData,
	mySavedCryptos,
	onMovedCrypto
}) => {
	return (
		<Container>
			<Title
				text="CryptoCap"
				showSettings={true}
				showExit={true}
				onCloseApp={onCloseApp}
			/>
			<GridTwoColContainer>
				{mySavedCryptos && mySavedCryptos.length > 0 ? (
					<div>
						<SubTitle>My Currencies:</SubTitle>
						<SavedCryptosContainer
							exchangeRates={exchangeRates}
							selectedFiatCurrency={selectedFiatCurrency}
							selectedLocale={selectedLocale}
							mySavedCryptos={mySavedCryptos}
							onMovedCrypto={onMovedCrypto}
						/>
					</div>
				) : (
					<div>
						<SubTitle>No saved cryptos...</SubTitle>
					</div>
				)}
				{globalData ? (
					<div>
						<SubTitle>Global Marketplace:</SubTitle>
						<GlobalCard
							exchangeRates={exchangeRates}
							selectedFiatCurrency={selectedFiatCurrency}
							globalData={globalData}
							selectedLocale={selectedLocale}
						/>
						<LastUpdateTimeBlock date={globalData.last_updated} />
					</div>
				) : (
					<div>
						<SubTitle>Unable to get global data...</SubTitle>
					</div>
				)}
			</GridTwoColContainer>
		</Container>
	);
};

export default ContentHome;
