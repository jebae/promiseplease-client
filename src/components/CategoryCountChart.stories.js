import React from "react";
import { storiesOf } from "@storybook/react";
import CategoryCountChart from "./CategoryCountChart";

const data = [
	{ cat: "경제", count: 289 },
	{ cat: "의료", count: 56 },
	{ cat: "환경", count: 121 },
	{ cat: "교통", count: 20 },
	{ cat: "교육", count: 89 },
	{ cat: "아동 및 육아", count: 21 },
	{ cat: "치안", count: 10 },
].map(item => ({
	id: item.cat,
	label: item.cat,
	value: item.count,
}));

storiesOf("CategoryCountChart", module)
	.add("init", () => {
		return (
			<CategoryCountChart data={ data }/>
		);
	})