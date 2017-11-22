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
	align-items: center;
	margin-bottom: 7px;
`;

export const SubTitle = styled.div`
	font-size: 0.9rem;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	color: #487991;
`;

export const TimeSwitchContainer = styled.div`
	text-align: right;

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

		&:hover,
		&.active {
			background-color: #153646;
			color: #fff;
		}
	}
`;

export const BackLink = styled.span`
	float: right;
	background-color: #0e2c3b;
	color: #aaa;
	border-radius: 15px;
	font-size: 0.9rem;
	text-align: center;
	display: inline-block;
	padding: 2px 10px;
	line-height: 1.9rem;
	font-weight: 500;

	&:hover {
		background-color: #153646;
	}
`;

export const SettingsLink = styled.span`
	float: right;
	background-color: #0e2c3b;
	color: #aaa;
	border-radius: 50%;
	text-align: center;
	display: inline-block;
	padding: 2px;
	width: 28px;
	height: 28px;
	vertical-align: middle;

	i {
		line-height: 28px;
	}

	&:hover {
		color: #fff;
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
	max-width: 60%;

	&:last-child {
		margin-right: 0;
	}
`;

export const ScrollContent = styled.div`
	overflow-y: auto;
`;

export const Card = styled.div`
	background-color: #0e2c3b;
	border-radius: 3px;
	padding: 10px;
	margin-bottom: 8px;
	font-size: 1.1rem;

	&.currency-tile {
		&:hover {
			background-color: #153646;
		}
	}
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
