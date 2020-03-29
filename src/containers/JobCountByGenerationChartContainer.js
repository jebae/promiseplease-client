import React from "react";
import withFetchChartData from "../utils/HOC/withFetchChartData";
import { fetchCandidateCount } from "../services/Candidate";
import JobCountByGenerationChart from "../components/JobCountByGenerationChart";

const fetch = () => fetchCandidateCount({ groupby: [ "generation", "job" ] });

function JobCountByGenerationChartContainer(props) {
	let data = props.data.count || [];
	const keys = Array.from(props.getKeys(data, [ "generation" ]));

	data = [ ...data ].sort((a, b) => (a.generation < b.generation) ? -1 : 1);

	if (data.length === 0)
		return null;
	return (
		<JobCountByGenerationChart
			data={ data }
			keys={ keys }
		/>
	);
}

export default withFetchChartData({ fetch })(JobCountByGenerationChartContainer);