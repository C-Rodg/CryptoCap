// Libraries
import React from "react";

// Icons
import { IconButton } from "./IconButton";

const MinimizeButton = ({ onMinimize }) => {
	return (
		<IconButton onClick={onMinimize}>
			<svg
				fill="#000000"
				height="24"
				viewBox="0 0 24 24"
				width="24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<line x1="5" y1="14" x2="19" y2="14" strokeWidth="2" stroke="#aaa" />
			</svg>
		</IconButton>
	);
};

export default MinimizeButton;
