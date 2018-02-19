import styled from "styled-components";

import { colors } from "../../styles/colors";

export const InputContainer = styled.div`
	margin-top: 5px;
	position: relative;
	color: ${colors.cardText};

	svg {
		position: absolute;
		top: 10px;
		left: 10px;
		fill: ${colors.cardText};
	}

	input {
		border-radius: 25px;
		padding: 0 15px 0 43px;
		border: 0;
		color: ${colors.cardText};
		box-sizing: border-box;
		width: 100%;
		background-color: ${colors.cardBackground};
		line-height: 2.7;

		&:focus,
		&:active {
			background-color: ${colors.cardBackgroundHover};
			outline: 0;
			color: ${colors.offWhite};
		}

		&::-webkit-input-placeholder {
			color: ${colors.cardText};
		}
	}
`;
