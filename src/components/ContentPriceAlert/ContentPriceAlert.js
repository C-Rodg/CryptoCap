import React, { Component } from "react";
import Title from "../Common/Title";
import { Container, GridTwoColContainer } from "../Common/Containers";
import { SubTitle } from "../Common/SubTitle";

class ContentPriceAlert extends Component {
	state = {
		alertAmount: "",
		alertBelow: true,
		errorMessage: false
	};
	// No coin found
	renderEmptyCoin() {
		return (
			<Container>
				<Title text="CryptoCap" showBack={true} />
				<GridTwoColContainer>
					<div>
						<SubTitle> - No Currencies Found -</SubTitle>
					</div>
				</GridTwoColContainer>
			</Container>
		);
	}

	validateAlert = ev => {
		ev.preventDefault();
		console.log("CREATE ALERT!");
	};

	render() {
		if (!this.props.location.state) {
			return this.renderEmptyCoin();
		}

		const { coin } = this.props.location.state;

		return (
			<Container>
				<Title text="Create Price Alert" showBack={true} icon={coin.id} />
				<GridTwoColContainer>
					<div>
						<div>
							<SubTitle>{coin.display_name || coin.id}</SubTitle>
						</div>
						<div>
							<SubTitle>Alert me at a price...</SubTitle>
							<div>
								<span>Below</span>
								<span>Above</span>
							</div>
						</div>
						<div>
							<form onSubmit={this.validateAlert}>
								<div>
									<svg
										fill="#000000"
										height="24"
										viewBox="0 0 24 24"
										width="24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
										<path d="M0 0h24v24H0z" fill="none" />
									</svg>
									<input type="text" placeholder="" />
								</div>
								<div>
									<button type="submit">Create Alert</button>
								</div>
							</form>
						</div>
					</div>
					<div />
				</GridTwoColContainer>
			</Container>
		);
	}
}

export default ContentPriceAlert;
