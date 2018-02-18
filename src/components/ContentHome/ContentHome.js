import React from "react";

import { Container, GridTwoColContainer } from "../Common/Containers";
import Title from "../Common/Title";
import { SubTitle } from "../Common/SubTitle";
import GlobalCard from "./GlobalCard";
import LastUpdateTimeBlock from "../Common/LastUpdateTimeBlock";
import SavedCryptosContainer from "./SavedCryptosContainer";

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
			</GridTwoColContainer>
		</Container>
	);
};

export default ContentHome;
