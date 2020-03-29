import React from "react";
import withFetchChartData from "../utils/HOC/withFetchChartData";
import { fetchCandidateCount } from "../services/Candidate";
import GenderRatioByCityChart from "../components/GenderRatioByCityChart";
import shortenCity from "../utils/shortenCity";

const fetch = () => fetchCandidateCount({ groupby: [ "city", "gender" ] });

function GenderRatioByCityChartContainer(props) {
	let data = props.data.count || [];
	const keys = [ "남", "여" ];

	data = [ ...data ].map(item => {
			const total = item.man + item.woman;
			const manRatio = Math.round(item.man / total * 1000) / 10;
			return {
				city: shortenCity(item.city),
				"남": manRatio,
				"여": Math.round((100 - manRatio) * 10) / 10
			}
		})
		.sort((a, b) => (a["여"] < b["여"]) ? -1 : 1);
	if (data.length === 0)
		return null;
	return (
		<GenderRatioByCityChart
			data={ data }
			keys={ keys }
		/>
	);
}

export default withFetchChartData({ fetch })(GenderRatioByCityChartContainer);