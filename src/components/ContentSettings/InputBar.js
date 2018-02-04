import React from "react";
import styled from "styled-components";

import { colors } from "../../styles/colors";

const StyledInputBar = styled.div`
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

const InputBar = ({ value, onUpdateSearchTerm }) => {
	return (
		<StyledInputBar>
			<svg
				fill="#000000"
				height="24"
				viewBox="0 0 24 24"
				width="24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
				<path d="M0 0h24v24H0z" fill="none" />
			</svg>
			<input
				type="text"
				placeholder="search..."
				value={value}
				onChange={onUpdateSearchTerm}
			/>
		</StyledInputBar>
	);
};

export default InputBar;
