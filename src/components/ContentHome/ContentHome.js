import React from "react";

import { Container, GridTwoColContainer } from "../Common/Containers";
import Title from "../Common/Title";
import { SubTitle } from "../Common/SubTitle";

const ContentHome = ({ onCloseApp }) => {
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
				</div>
				<div>
					<SubTitle>Global Marketplace:</SubTitle>
				</div>
			</GridTwoColContainer>
		</Container>
	);
};

export default ContentHome;
