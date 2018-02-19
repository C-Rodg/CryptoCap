import styled from "styled-components";

import { colors } from "../../styles/colors";

export const IconButton = styled.span`
	cursor: pointer;
	background-color: ${colors.cardBackground};
	color: ${colors.cardText};
	border-radius: 50%;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2px;
	width: 28px;
	height: 28px;
	vertical-align: middle;
	cursor: pointer;
	margin-left: 8px;
	transition: all 0.3s ease;
	svg {
		fill: ${colors.cardText};
		&:hover {
			fill: ${colors.cardTextHover};
		}
	}
	i {
		line-height: 28px;
	}
	&:hover {
		background-color: ${colors.cardBackgroundHover};
		color: ${colors.cardTextHover};
	}
`;
