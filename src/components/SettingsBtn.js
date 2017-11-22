import React from "react";
import { Link } from "react-router-dom";

import { SettingsLink } from "./Styled";

const SettingsBtn = () => {
	return (
		<Link to="/settings">
			<SettingsLink>
				<i className="material-icons">settings</i>
			</SettingsLink>
		</Link>
	);
};

export default SettingsBtn;
