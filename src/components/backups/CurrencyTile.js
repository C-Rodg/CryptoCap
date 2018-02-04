import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";

import { formatCurrency } from "../utils/numberFormats";
import {
	Card,
	Row,
	Col,
	CurrencyTitles,
	CurrencySymbol,
	CurrencyPercent
} from "./Styled";

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			index: props.index
		};
	}
};

const cardTarget = {
	hover(props, monitor, component) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

		// Determine mouse position
		const clientOffset = monitor.getClientOffset();

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return;
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return;
		}

		// Time to actually perform the action
		props.moveCard(dragIndex, hoverIndex);

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;
	}
};

@DropTarget("currencytile", cardTarget, connect => ({
	connectDropTarget: connect.dropTarget()
}))
@DragSource("currencytile", cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))
export default class CurrencyTile extends Component {
	render() {
		const {
			currencyType,
			timeFormat,
			localeType,
			coinId,
			name,
			symbol,
			connectDragSource,
			connectDropTarget,
			isDragging
		} = this.props;
		const priceCountry = this.props["price_" + currencyType.toLowerCase()] || 0;
		const price = formatCurrency(priceCountry, localeType, currencyType);
		let priceChange = `${this.props["percent_change_" + timeFormat]}%`;
		let negative = priceChange.indexOf("-") === -1 ? false : true;
		if (!negative) {
			priceChange = `+${priceChange}`;
		}

		const opacity = isDragging ? 0 : 1;

		return connectDragSource(
			connectDropTarget(
				<div style={{ opacity }}>
					<Card className="currency-tile">
						<Link
							to={{
								pathname: "/crypto/" + coinId,
								state: { coin: this.props }
							}}
						>
							<Row>
								<Col>
									<CurrencyTitles>{name}</CurrencyTitles>
									<CurrencySymbol>{symbol}</CurrencySymbol>
								</Col>
								<Col right>
									<CurrencyTitles>{price}</CurrencyTitles>
									<CurrencyPercent negative={negative}>
										{priceChange}
									</CurrencyPercent>
								</Col>
							</Row>
						</Link>
					</Card>
				</div>
			)
		);
	}
}
