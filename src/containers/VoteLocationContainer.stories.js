import React from "react";
import { storiesOf } from "@storybook/react";
import VoteLocationContainer from "./VoteLocationContainer";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import withMemoryRouter from "../../.test_utils/withMemoryRouter";

const SERVICE_API = process.env.SERVICE_API;
const locations = [
	{
		name: "종로구",
		locations: [
			{
				address: "서울특별시 종로구 종로1.2.3.4가동 81-2",
				latitude: 37.572036,
				longitude: 126.976594,
				type: "사전"
			},
			{
				address: "서울특별시 종로구 내수동 30-1",
				latitude: 37.573800,
				longitude: 126.972732,
				type: "당일"
			},
		]
	},
	{
		name: "마포구",
		locations: [
			{
				address: "서울특별시 종로구 청운효자동 자하문로17길",
				latitude: 37.581802,
				longitude: 126.969253,
				type: "사전"
			},
			{
				address: "서울특별시 종로구 삼청동 63-18",
				latitude: 37.583043,
				longitude: 126.981977,
				type: "당일"
			},
			{
				address: "서울특별시 종로구 종로1.2.3.4가동 인사동10길",
				latitude: 37.574321,
				longitude: 126.985516,
				type: "당일"
			},
		]
	},
	{
		name: "은평구",
		locations: [
			{
				address: "서울특별시 종로구 종로1.2.3.4가동 103-2",
				latitude: 37.569792,
				longitude: 126.980448,
				type: "사전"
			},
			{
				address: "서울특별시 중구 정동 1-36",
				latitude: 37.567623,
				longitude: 126.973367,
				type: "당일"
			},
		]
	},
];

storiesOf("VoteLocationContainer", module)
	.add("init", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.onGet(`${SERVICE_API}/vote-location`)
			.reply(200, { locations });
		const Component = withMemoryRouter({
			path: "/constituency/:city/:constituency",
			initialEntry: "/constituency/서울/마포구을"
		})(VoteLocationContainer);

		return (
			<Component
				fetchCountUp={ () => {} }
			/>
		);
	})