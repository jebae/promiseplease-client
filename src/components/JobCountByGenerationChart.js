import React from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import ChartLegend from "./ChartLegend";

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

export default function JobCountByGenerationChart(props) {
	const getColorMap = (keys) => {
		let map = {};
		for (let i=0; i < keys.length; i++)
			map[keys[i]] = COLOR_SCHEME[ i % COLOR_SCHEME.length ];
		return map;
	}

	const withColor = (colorMap) => (item) => {
		let colors = {};

		for (let key of Object.keys(item)) {
			if (key !== "generation")
				colors[`${key}Color`] = colorMap[key];
		}
		return { ...item, ...colors };
	};

	const { data, keys } = props;
	const colorMap = getColorMap(keys);
	const dataWithColor = [ ...data ].map(withColor(colorMap));
	const legendData = Object.keys(colorMap).map(item => ({
		label: item,
		color: colorMap[item]
	}));

	return (
		<div className="Chart-Section">
			<div className="Chart-Title">후보자 연령대별 직업</div>
			<div className="Chart-Content">
				<ResponsiveBar
					data={ dataWithColor }
					keys={ keys }
					indexBy="generation"
					margin={ { top: 40, right: 20, bottom: 60, left: 20 } }
					padding={ 0.6 }
					colors={ (item) => colorMap[item.id] }
					borderColor={{ from: "color", modifiers: [ [ "darker", 1.6 ] ] }}
					axisTop={ null }
					axisRight={ null }
					axisLeft={ null }
					axisBottom={{
						tickSize: 5,
						tickPadding: 5,
						tickRotation: 0,
						legend: "연령대",
						legendPosition: "middle",
						legendOffset: 40
					}}
					labelSkipWidth={ 12 }
					labelSkipHeight={ 12 }
					labelTextColor={{ from: "color", modifiers: [ [ "darker", 1.6 ] ] }}
					animate={ true }
					motionStiffness={ 90 }
					motionDamping={ 15 }
				/>
			</div>
			<ChartLegend data={ legendData }/>
		</div>
	);
}

JobCountByGenerationChart.propTypes = {
	data: PropTypes.array.isRequired,
	keys: PropTypes.array.isRequired,
};