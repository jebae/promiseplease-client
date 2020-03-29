import React from "react";
import { storiesOf } from "@storybook/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import CategoryCountChartContainer from "./CategoryCountChartContainer";

const count = [
	{ cat: "경제", count: 289 },
	{ cat: "의료", count: 56 },
	{ cat: "환경", count: 121 },
	{ cat: "교통", count: 20 },
	{ cat: "교육", count: 89 },
	{ cat: "아동 및 육아", count: 21 },
	{ cat: "치안", count: 10 },
];

const SERVICE_API = process.env.SERVICE_API;

storiesOf("CategoryCountChartContainer", module)
	.add("200", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.onGet(`${SERVICE_API}/promise/count`)
			.reply(200, { count });
		return <CategoryCountChartContainer fetchCountUp={ () => {} } />;
	})
	.add("500", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.onGet(`${SERVICE_API}/promise/count`)
			.reply(500);
		return <CategoryCountChartContainer fetchCountUp={ () => {} } />;
	})
	.add("empty data", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.onGet(`${SERVICE_API}/promise/count`)
			.reply(200, { count: [] });
		return <CategoryCountChartContainer fetchCountUp={ () => {} } />;
	});