import React from "react";
import PropTypes from "prop-types";

const circleRadius = 5;
const textLeftMargin = circleRadius * 2 + 5;
const charSize = 12;
const itemMarginRight = 10;
const MAX_WINDOW_WIDTH = 768;
const itemCountPerLine = (window.innerWidth >= MAX_WINDOW_WIDTH) ? 5 : 4;

function LegendItem(props) {
	const { x, y, text, color } = props;

	return (
		<g transform={ `translate(${x}, ${y})` }>
			<circle cx={ circleRadius } cy={ circleRadius } r={ circleRadius } fill={ color }/>
			<text textAnchor="start" transform={ `translate(${textLeftMargin}, ${circleRadius * 2})` } fontSize={ charSize } fill="#282828">{ text }</text>
		</g>
	);
}

export default function ChartLegend(props) {
	let x = 0;
	let y = 0;
	const dx = circleRadius * 2 + textLeftMargin + itemMarginRight;
	const dy = charSize * 2;
	const height = (props.data.length / itemCountPerLine + 1) * dy - dy + 1;

	return (
		<svg height={ `${ height }px` } className="Chart-Legend">
		{
			props.data.map((item, key) => {
				const component = (
					<LegendItem
						key={ item.label }
						x={ x }
						y={ y }
						text={ item.label }
						color={ item.color }
					/>
				);
				x += dx + (item.label.length * (charSize - 4));
				if (key % itemCountPerLine === itemCountPerLine - 1) {
					x = 0;
					y += dy;
				}
				return component
			})
		}
		</svg>
	);
}

LegendItem.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired
}

ChartLegend.propTypes = {
	data: PropTypes.array
}