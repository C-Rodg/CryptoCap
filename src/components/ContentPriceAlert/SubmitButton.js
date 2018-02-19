import React from "react";
import styled from "styled-components";

import { colors } from "../../styles/colors";

const StyledSubmitBtn = styled.div`
	text-align: center;

	button {
		background-color: transparent;
		transition: background-color 0.3s ease;
		outline: 0;

		margin-top: 10px;
		border-radius: 30px;
		border: 3px solid ${colors.cardBackground};
		font-size: 1.3rem;
		cursor: pointer;
		color: ${colors.cardText};
		padding: 10px 35px;
		text-transform: uppercase;
		&:hover {
			background-color: ${colors.cardBackground};
		}
	}
`;

const SubmitButton = () => {
	return (
		<StyledSubmitBtn>
			<button type="submit">Create Alert</button>
		</StyledSubmitBtn>
	);
};

export default SubmitButton;
