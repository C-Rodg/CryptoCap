import React from "react";
import styled from "styled-components";

import BackButton from "./BackButton";
import SettingsButton from "./SettingsButton";
import ExitButton from "./ExitButton";

const StyledTitle = styled.div`
	font-size: 1.5rem;
	font-weight: 400;
	letter-spacing: 0.09em;
	display: flex;
	align-items: center;

	.currency-icon {
		margin-right: 10px;
	}
`;

const NavButtons = styled.div`
	text-align: right;
	flex: 1;
	justify-content: flex-end;
	display: flex;
`;

const Title = ({ icon, text, showBack, showSettings, showExit }) => {
	return (
		<StyledTitle>
			<div>
				{icon && icon}
				{text}
			</div>
			<NavButtons>
				{showBack && <BackButton />}
				{showSettings && <SettingsButton />}
				{showExit && <ExitButton />}
			</NavButtons>
		</StyledTitle>
	);
};

export default Title;
