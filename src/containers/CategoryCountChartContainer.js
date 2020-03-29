import React from "react";
import PropTypes from "prop-types";
import withFetchChartData from "../utils/HOC/withFetchChartData";
import { fetchPromiseCount } from "../services/Promise";
import CategoryCountChart from "../components/CategoryCountChart";

const fetch = () => fetchPromiseCount({ groupby: [ "category" ] });

function CategoryCountChartContainer(props) {
	let data = props.data.count || [];

	data = data.map(item => ({
		id: item.cat,
		label: item.cat,
		value: item.count,
	}));
	if (data.length === 0)
		return null;
	return <CategoryCountChart data={ data }/>;
}

CategoryCountChartContainer.propTypes = {
	data: PropTypes.object
}

export default withFetchChartData({ fetch })(CategoryCountChartContainer);