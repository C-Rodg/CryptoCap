import React from "react";
import { Link } from "react-router-dom";
import { BackLink } from "./Styled";

const BackBtn = () => {
	return (
		<Link to="/">
			<BackLink>{"<" + "back"}</BackLink>
		</Link>
	);
};

export default BackBtn;
