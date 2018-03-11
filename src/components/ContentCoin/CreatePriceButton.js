// Libraries
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled Components
import { StyledToggle } from "./StyledToggle";

// Styles
const StyledToggleExtraTop = StyledToggle.extend`
	margin-top: 20px;
`;

const CreatePriceButton = ({
	coin,
	hasAlertAbove,
	hasAlertBelow,
	symbol,
	onRemoveAlert
}) => {
	return (
		<div>
			<StyledToggleExtraTop className="percent-positive">
				<Link
					to={{
						pathname: "/alert/" + symbol,
						state: { coin }
					}}
				>
					-Create New Price Alert-
				</Link>
			</StyledToggleExtraTop>
			{hasAlertBelow && (
				<StyledToggle
					className="percent-negative"
					onClick={onRemoveAlert(true)}
				>
					-Remove Price Alert Under {hasAlertBelow}-
				</StyledToggle>
			)}
			{hasAlertAbove && (
				<StyledToggle
					className="percent-negative"
					onClick={onRemoveAlert(false)}
				>
					-Remove Price Alert Above {hasAlertAbove}-
				</StyledToggle>
			)}
		</div>
	);
};

export default CreatePriceButton;
