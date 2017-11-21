import React from "react";

import BackBtn from "./BackBtn";
import { NavTitle } from "./Styled";

const ContentSettings = props => {
	return (
		<div className="content-settings container">
			<NavTitle>
				Settings<BackBtn />
			</NavTitle>
		</div>
	);
};

export default ContentSettings;
