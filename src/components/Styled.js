import styled from "styled-components";

export const NavTitle = styled.div`
	font-size: 1.5rem;
	font-weight: 700;
	letter-spacing: 0.07em;
	margin-bottom: 8px;
`;

export const SubTitleContainer = styled.div`
	display: flex;
	width: 100%;
`;

export const SubTitle = styled.div`
	font-size: 0.9rem;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	color: #487991;
	margin-bottom: 5px;
`;

export const TimeSwitchContainer = styled.div`
	text-align: right;
	margin-bottom: 10px;
	font-size: 0.9rem;
	flex: 1;

	a {
		background-color: #0e2c3b;
		color: #aaa;
		border-radius: 15px;
		margin-left: 5px;
		padding: 2px 10px;
		cursor: pointer;
		display: inline-block;
		width: 25px;
		text-align: center;

		&.active {
			color: #fff;
		}
	}
`;

export const Row = styled.div`
	width: 100%;
	display: flex;
`;

export const Col = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	margin-right: 15px;
	text-align: ${props => (!props.right ? "left" : "right")};

	&:last-child {
		margin-right: 0;
	}
`;

export const ScrollContent = styled.div`overflow-y: auto;`;

export const Card = styled.div`
	background-color: #0e2c3b;
	border-radius: 3px;
	padding: 10px;
	margin-bottom: 8px;
	font-size: 1.1rem;
`;

export const CardRow = styled.div`
	line-height: 150%;
	display: flex;
`;

export const CardRowTitle = styled.span`
	color: #487991;
	padding-right: 15px;
	display: inline-block;
	flex: 1;
`;

export const CardRowResponse = styled.span`
	display: inline-block;
	text-align: right;
`;

export const CurrencyTitles = styled.div`
	font-size: 1.3rem;
	line-spacing: 150%;
`;

export const CurrencySymbol = styled.div`
	font-size: 0.8rem;
	color: #487991;
	letter-spacing: 0.04em;
`;

export const CurrencyPercent = styled.div`
	font-size: 0.8rem;
	color: ${props => (props.negative ? "#fd7576" : "#91e697")};
	letter-spacing: 0.04em;
`;
