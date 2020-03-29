import React from "react";
import { storiesOf } from "@storybook/react";
import GenderRatioByCityChartContainer from "./GenderRatioByCityChartContainer";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const SERVICE_API = process.env.SERVICE_API;
const count = [
	{ city: "서울특별시", "man": 45, "woman": 12 },
	{ city: "대전광역시", "man": 56, "woman": 10 },
	{ city: "세종특별자치시", "man": 56, "woman": 30 },
	{ city: "제주특별자치도", "man": 20, "woman": 3 },
	{ city: "전라남도", "man": 30, "woman": 13 },
	{ city: "충청북도", "man": 45, "woman": 2 },
	{ city: "강원도", "man": 45, "woman": 2 },
];

storiesOf("GenderRatioByCityChartContainer", module)
	.add("200", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.onGet(`${SERVICE_API}/candidate/count`)
			.reply(200, { count });
		return (
			<GenderRatioByCityChartContainer
				fetchCountUp={ () => {} }
			/>
		);
	})
	.add("500", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.onGet(`${SERVICE_API}/candidate/count`)
			.reply(500);
		return (
			<GenderRatioByCityChartContainer
				fetchCountUp={ () => {} }
			/>
		);
	})
	.add("empty data", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.onGet(`${SERVICE_API}/candidate/count`)
			.reply(200, { count: [] });
		return (
			<GenderRatioByCityChartContainer
				fetchCountUp={ () => {} }
			/>
		);
	})