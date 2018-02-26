import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { StyledToggle } from "./StyledToggle";

const StyledToggleExtraTop = StyledToggle.extend`
	margin-top: 20px;
`;

const CreatePriceButton = ({ coin, hasAlert, symbol, onRemoveAlert }) => {
	if (hasAlert) {
		return (
			<StyledToggleExtraTop
				className="percent-negative"
				onClick={onRemoveAlert}
			>
				-Remove Price Alert-
			</StyledToggleExtraTop>
		);
	}
	return (
		<StyledToggleExtraTop className="percent-positive">
			<Link
				to={{
					pathname: "/alert/" + symbol,
					state: { coin }
				}}
			>
				-Create Price Alert-
			</Link>
		</StyledToggleExtraTop>
	);
};

export default CreatePriceButton;
