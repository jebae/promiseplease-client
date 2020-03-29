import React from "react";
import withFetchChartData from "../utils/HOC/withFetchChartData";
import shortenCity from "../utils/shortenCity";
import { fetchPromiseCount } from "../services/Promise";
import CategoryCountByCityChart from "../components/CategoryCountByCityChart";

const fetch = () => fetchPromiseCount({ groupby: [ "city", "category" ] });

function CategoryCountByCityChartContainer(props) {
	let data = props.data.count || [];
	const keys = Array.from(props.getKeys(data, [ "city" ]));

	data = [ ...data ].map(item => ({
			...item,
			city: shortenCity(item.city)
		}))
		.sort((a, b) => {
			const aTotal = keys.reduce((acc, cur) => (a[cur]) ? acc + a[cur] : acc, 0);
			const bTotal = keys.reduce((acc, cur) => (b[cur]) ? acc + b[cur] : acc, 0);
			return (aTotal > bTotal) ? 1 : -1;
		});
	if (data.length === 0)
		return null;
	return (
		<CategoryCountByCityChart
			data={ data }
			keys={ keys }
		/>
	);
}

export default withFetchChartData({ fetch })(CategoryCountByCityChartContainer);