import React from "react";
import styled from "styled-components";

import { SubTitle } from "../Common/SubTitle";
import { colors } from "../../styles/colors";

const StyledAboveBelow = styled.div`
	margin-top: 7px;
	display: flex;
	align-items: center;
`;

const StyledButtonContainer = styled.div`
	flex: 1;
	text-align: right;

	span {
		border: 1px solid ${colors.cardBackground};
		display: inline-block;
		padding: 3px 13px;
		margin-left: 13px;
		border-radius: 15px;
		cursor: pointer;
		color: ${colors.cardBackground};
		transition: all 0.3s ease;

		&:hover,
		&.selected {
			border-color: ${colors.subText};
			color: ${colors.subText};
		}
	}
`;

const AboveBelow = ({ alertBelow, onUpdateAboveBelow }) => {
	return (
		<StyledAboveBelow>
			<SubTitle>Alert me at a price...</SubTitle>
			<StyledButtonContainer>
				<span
					className={alertBelow ? "selected" : ""}
					onClick={onUpdateAboveBelow(true)}
				>
					Below
				</span>
				<span
					className={!alertBelow ? "selected" : ""}
					onClick={onUpdateAboveBelow(false)}
				>
					Above
				</span>
			</StyledButtonContainer>
		</StyledAboveBelow>
	);
};

export default AboveBelow;
