import styled from "styled-components";

export const Container = styled.div`
	padding: 5px 10px 5px 10px;
	flex: 1;
	display: flex;
	flex-direction: column;
`;

export const GridTwoColContainer = styled.div`
	padding-top: 5px;
	flex: 1;
	display: flex;

	> div {
		flex: 1;

		&:first-child {
			padding-right: 20px;
		}
	}
`;
