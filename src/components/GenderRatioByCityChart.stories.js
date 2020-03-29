import React from "react";
import { storiesOf } from "@storybook/react";
import GenderRatioByCityChart from "./GenderRatioByCityChart";

const data = [
	{ city: "서울특별시", "남": 89.5 },
	{ city: "대전광역시", "남": 76.4 },
	{ city: "세종특별자치시", "남": 77.4 },
	{ city: "제주특별자치도", "남": 55.9 },
	{ city: "전라남도", "남": 67.1 },
	{ city: "충청북도", "남": 78.4 },
].map(item => ({
	...item,
	"남": Math.round(item["남"] * 10) / 10,
	"여": Math.round((100 - item["남"]) * 10) / 10
}));
const keys = [ "남", "여" ];

storiesOf("GenderRatioByCityChart", module)
	.add("init", () => {
		return (
			<GenderRatioByCityChart
				data={ data }
				keys={ keys }
			/>
		);
	})