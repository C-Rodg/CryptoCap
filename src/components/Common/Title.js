// Libraries
import React from "react";
import styled from "styled-components";

// Components
import BackButton from "./BackButton";
import SettingsButton from "./SettingsButton";
import ExitButton from "./ExitButton";
import MinimizeButton from "./MinimizeButton";

// Styles
const StyledTitle = styled.div`
	font-size: 1.5rem;
	font-weight: 400;
	letter-spacing: 0.09em;
	display: flex;
	align-items: center;
	min-height: 34px;

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

const Icon = styled.span`
	margin-right: 4px;
`;

const Title = ({
	icon,
	text,
	showBack,
	showSettings,
	showExit,
	onCloseApp,
	onMinimizeApp,
	showMinimize
}) => {
	return (
		<StyledTitle>
			<div>
				{icon && <Icon className={"cc " + icon} />}
				{text}
			</div>
			<NavButtons>
				{showBack && <BackButton />}
				{showSettings && <SettingsButton />}
				{showMinimize && <MinimizeButton onMinimize={onMinimizeApp} />}
				{showExit && <ExitButton onCloseApp={onCloseApp} />}
			</NavButtons>
		</StyledTitle>
	);
};

export default Title;
