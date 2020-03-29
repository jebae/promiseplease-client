import React from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import ChartLegend from "../components/ChartLegend";
import "../stylesheets/components/Chart.scss";

const COLOR_SCHEME = [
	"#7fc97f",
	"#beaed4",
	"#fdc086",
	"#ffff99",
	"#386cb0",
	"#f0027f",
	"#bf5b17",
	"#666666",
];

export default function CategoryCountChart(props) {
	const data = props.data.map((item, i) => ({
		...item,
		color: COLOR_SCHEME[ i % COLOR_SCHEME.length ]
	}));

	return (
		<div className="Chart-Section">
			<div className="Chart-Title">공약 분류</div>
			<div className="Chart-Content">
				<ResponsivePie
					data={ data }
					margin={ { top: 40, right: 40, bottom: 40, left: 40 } }
					innerRadius={ 0.5 }
					padAngle={ 1.5 }
					cornerRadius={ 3 }
					colors={ (item) => item.color }
					borderWidth={ 1 }
					borderColor={ { from: "color", modifiers: [ [ "darker", 0.2 ] ] } }
					radialLabelsSkipAngle={ 10 }
					radialLabelsTextXOffset={ 5 }
					radialLabelsTextColor="#333333"
					radialLabelsLinkOffset={ 0 }
					radialLabelsLinkDiagonalLength={ 7 }
					radialLabelsLinkHorizontalLength={ 7 }
					radialLabelsLinkStrokeWidth={ 1 }
					radialLabelsLinkColor={ { from: "color" } }
					slicesLabelsSkipAngle={ 10 }
					slicesLabelsTextColor="#333333"
					animate={ true }
					motionStiffness={ 90 }
					motionDamping={ 15 }
				/>
			</div>
			<ChartLegend data={ data }/>
		</div>
	);
}

CategoryCountChart.propTypes = {
	data: PropTypes.array.isRequired,
};