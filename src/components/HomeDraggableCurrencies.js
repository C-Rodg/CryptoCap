import React, { Component } from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { ScrollContent } from "./Styled";
import CurrencyTile from "./CurrencyTile";

@DragDropContext(HTML5Backend)
export default class HomeDraggableCurrencies extends Component {
	render() {
		const {
			currencyList,
			timeFormat,
			currencyType,
			localeType,
			onMoveTile
		} = this.props;
		return (
			<ScrollContent>
				{currencyList.map((curr, i) => (
					<CurrencyTile
						{...curr}
						key={curr.id}
						index={i}
						coinId={curr.id}
						timeFormat={timeFormat}
						currencyType={currencyType}
						localeType={localeType}
						moveCard={onMoveTile}
					/>
				))}
			</ScrollContent>
		);
	}
}
