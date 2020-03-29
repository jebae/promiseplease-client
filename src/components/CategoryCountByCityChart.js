import React from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";

export default function CategoryCountByCityChart(props) {	
	const { data, keys } = props;

	return (
		<div className="Chart-Section">
			<div className="Chart-Title">지역별 공약</div>
			<div className="Chart-Content">
				<ResponsiveBar
					data={ data }
					keys={ keys }
					indexBy="city"
					margin={ { top: 40, right: 100, bottom: 50, left: 40 } }
					padding={ 0.3 }
					layout="horizontal"
					colors={ { scheme: "nivo" } }
					borderColor={{ from: "color", modifiers: [ [ "darker", 1.6 ] ] }}
					axisTop={ null }
					axisRight={ null }
					axisBottom={ null }
					labelSkipWidth={ 12 }
					labelSkipHeight={ 12 }
					labelTextColor={{ from: "color", modifiers: [ [ "darker", 1.6 ] ] }}
					legends={[
						{
							dataFrom: "keys",
							anchor: "top-right",
							direction: "column",
							justify: false,
							translateX: 120,
							translateY: 0,
							itemsSpacing: 2,
							itemWidth: 100,
							itemHeight: 20,
							itemDirection: "left-to-right",
							symbolSize: 10,
						}
					]}
					animate={ true }
					motionStiffness={ 90 }
					motionDamping={ 15 }
				/>
			</div>
		</div>
	);
}

CategoryCountByCityChart.propTypes = {
	data: PropTypes.array.isRequired,
	keys: PropTypes.array.isRequired,
};