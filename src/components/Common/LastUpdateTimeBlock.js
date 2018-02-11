import React from "react";
import styled from "styled-components";

import { colors } from "../../styles/colors";
import { getTimeString } from "../../utils/dateHelper";

const StyledTime = styled.div`
	font-size: 0.9rem;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	color: ${colors.subText};
	line-height: 140%;
`;

const LastUpdateTimeBlock = ({ date }) => {
	const formattedDate = getTimeString(date);
	return (
		<StyledTime>
			<div>Last Updated:</div>
			<div>{formattedDate}</div>
		</StyledTime>
	);
};

export default LastUpdateTimeBlock;
