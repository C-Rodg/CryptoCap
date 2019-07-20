// Libraries
import React from 'react';
import styled from 'styled-components';

// Properties
import { colors } from '../../styles/colors';

// Styles
const StyledCryptoTile = styled.div`
	cursor: pointer;
	color: ${colors.cardText};
	border-radius: 25px;
	font-size: 1.1rem;
	background-color: ${colors.cardBackground};
	margin-bottom: 5px;
	padding: 8px 15px 8px 20px;
	cursor: pointer;
	display: flex;
	align-items: center;
	min-height: 40px;

	&:hover,
	&.selected {
		background-color: ${colors.cardBackgroundHover};
		color: ${colors.offWhite};
	}

	.currency-title {
		flex: 1;
		pointer-events: none;
	}

	.price-alert {
		margin-right: 5px;
		pointer-events: none;
	}
`;

const CryptoTile = ({
	symbol,
	name = symbol,
	identifier,
	isSelected,
	hasPriceAlert
}) => {
	return (
		<StyledCryptoTile
			className={isSelected ? 'selected' : ''}
			data-cryptoid={identifier}
			data-selected={isSelected}
		>
			<div className="currency-title">
				{name} {symbol ? `(${symbol})` : ''}
			</div>
			{hasPriceAlert && (
				<svg
					className="price-alert"
					fill="#f5f5f5"
					height="24"
					viewBox="0 0 24 24"
					width="24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
					<path d="M0 0h24v24H0z" fill="none" />
				</svg>
			)}

			{isSelected && (
				<svg
					fill="#f5f5f5"
					height="24"
					viewBox="0 0 24 24"
					width="24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
				</svg>
			)}
		</StyledCryptoTile>
	);
};

export default CryptoTile;
