import React from "react";
import { storiesOf } from "@storybook/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import CategoryCountByCityChartContainer from "./CategoryCountByCityChartContainer";

const count = [
	{ city: "서울특별시", "경제": 230, "의료": 100, "환경": 30, "교통": 20, "아동 및 육아": 19, "치안": 4, },
	{ city: "대전광역시", "경제": 120, "의료": 103, "환경": 21, "교통": 40, "교육": 3, },
	{ city: "세종특별자치시", "경제": 60, "의료": 32, "환경": 67, "아동 및 육아": 19, "치안": 43, },
	{ city: "제주특별자치도", "의료": 34, "환경": 10, "치안": 21, },
	{ city: "전라남도", "경제": 110, "환경": 21, "교통": 78, "아동 및 육아": 17, "치안": 3, },
	{ city: "충청북도", "경제": 64, "환경": 12, "교통": 38, },
];

const SERVICE_API = process.env.SERVICE_API;

storiesOf("CategoryCountByCityChartContainer", module)
	.add("200", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.onGet(`${SERVICE_API}/promise/count`)
			.reply(200, { count });
		return (
			<CategoryCountByCityChartContainer
				fetchCountUp={ () => {} }
			/>
		);
	})
	.add("500", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.onGet(`${SERVICE_API}/promise/count`)
			.reply(500);
		return (
			<CategoryCountByCityChartContainer
				fetchCountUp={ () => {} }
			/>
		);
	})
	.add("empty data", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.onGet(`${SERVICE_API}/promise/count`)
			.reply(200, { count: [] });
		return (
			<CategoryCountByCityChartContainer
				fetchCountUp={ () => {} }
			/>
		);
	})