import React from "react";

import { Container } from "./Common/Container";
import Title from "./Common/Title";

const ContentHome = () => {
	return (
		<Container>
			<Title
				text="CryptoCap"
				showBack={true}
				showSettings={true}
				showExit={true}
			/>
		</Container>
	);
};

export default ContentHome;
