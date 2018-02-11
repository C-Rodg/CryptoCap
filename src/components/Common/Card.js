import styled from "styled-components";
import { colors } from "../../styles/colors";

export const Card = styled.div`
	margin-top: 5px;
	margin-bottom: 10px;
	border-radius: 6px;
	padding: 10px;
	background-color: ${colors.cardBackground};
	color: ${colors.cardText};
`;

export const CardRow = styled.div`
	display: flex;
	line-height: 150%;
`;

export const CardRowTitle = styled.div`
	padding-right: 10px;
	flex: 1;
`;

export const CardRowResponse = styled.div`
	text-align: right;
	color: ${colors.offWhite};
`;
