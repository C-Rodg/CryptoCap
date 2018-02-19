import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../styles/colors";

const StyledBackButton = styled(Link)`
	cursor: pointer;
	background-color: ${colors.cardBackground};
	color: ${colors.cardText};
	border-radius: 15px;
	font-size: 0.9rem;
	text-align: center;
	display: inline-block;
	padding: 2px 10px;
	line-height: 1.9rem;
	font-weight: 400;
	transition: all 0.3s ease;
	&:hover {
		background-color: ${colors.cardBackgroundHover};
		color: ${colors.cardTextHover};
	}
`;

const BackButton = () => {
	return <StyledBackButton to="/">{"<back"}</StyledBackButton>;
};

export default BackButton;
