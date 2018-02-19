import React from "react";
import { Link } from "react-router-dom";

import { StyledToggle } from "./StyledToggle";

const CreatePriceButton = ({ coin, hasAlert, symbol, onRemoveAlert }) => {
	if (hasAlert) {
		return (
			<StyledToggle className="percent-negative" onClick={onRemoveAlert}>
				-Remove Price Alert-
			</StyledToggle>
		);
	}
	return (
		<StyledToggle className="percent-positive">
			<Link
				to={{
					pathname: "/alert/" + symbol,
					state: { coin }
				}}
			>
				-Create Price Alert-
			</Link>
		</StyledToggle>
	);
};

export default CreatePriceButton;
