import React from "react";
import { storiesOf } from "@storybook/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import GeneralInfoContainer from "./GeneralInfoContainer";

const SERVICE_API = process.env.SERVICE_API;

storiesOf("GeneralInfoContainer", module)
	.add("init", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock
			.onGet(`${SERVICE_API}/candidate/age`, { params: { aggregate: "avg" } })
			.reply(200, { age: 57 })
			.onGet(`${SERVICE_API}/candidate/age`, { params: { aggregate: "min" } })
			.reply(200, { age: 36 })
			.onGet(`${SERVICE_API}/candidate/age`, { params: { aggregate: "max" } })
			.reply(200, { age: 76 })
			.onGet(`${SERVICE_API}/party/count`)
			.reply(200, { count: 21 })
			.onGet(`${SERVICE_API}/candidate/count`, { params: { groupby: JSON.stringify(["gender"]) } })
			.reply(200, { count: { man: 230, woman: 50 } })
		return (
			<GeneralInfoContainer
				fetchCountUp={ () => {} }
			/>
		);
	})