import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { SubTitle } from "../Common/SubTitle";
import { colors } from "../../styles/colors";

const StyledSubContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const StyledLink = styled(Link)`
	border: 1px solid;
	font-size: 0.9rem;
	border: 1px solid ${colors.subText};
	padding: 3px 13px;
	border-radius: 15px;
	cursor: pointer;
	color: ${colors.subText};
	transition: all 0.3s ease;
	&:hover {
		border-color: ${colors.offWhite};
		color: ${colors.offWhite};
	}
`;

const SubContainer = ({ id, coin }) => {
	return (
		<StyledSubContainer>
			<SubTitle>{id}</SubTitle>
			<StyledLink to={{ pathname: `/graph/${id}`, state: { coin } }}>
				View Graph Data
			</StyledLink>
		</StyledSubContainer>
	);
};

export default SubContainer;
