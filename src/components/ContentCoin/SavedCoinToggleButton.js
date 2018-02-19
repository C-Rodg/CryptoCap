import React from "react";

import { StyledToggle } from "./StyledToggle";

const SavedCoinToggleButton = ({ isSaved, onToggleSavedCoin }) => {
	if (isSaved) {
		return (
			<StyledToggle className="percent-negative" onClick={onToggleSavedCoin}>
				-Remove from saved coins-
			</StyledToggle>
		);
	}
	return (
		<StyledToggle className="percent-positive" onClick={onToggleSavedCoin}>
			-Add to saved coins-
		</StyledToggle>
	);
};
export default SavedCoinToggleButton;
