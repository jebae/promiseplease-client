import React from "react";
import axios from "axios";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import Jumbotron from "./Jumbotron";

const words =  [
	{ word: "홍길동", city: "서울", district: "종로구갑", type: "지역" },
	{ word: "홍록기", city: "대전", district: "서구을", type: "지역" },
	{ word: "홍삼", city: "무안", district: "일로", type: "후보" },
	{ word: "홍길동", city: "서울", district: "종로구갑", type: "지역" },
	{ word: "홍록기", city: "대전", district: "서구을", type: "지역" },
	{ word: "홍삼", city: "무안", district: "일로", type: "후보" },
];
const SERVICE_API = process.env.SERVICE_API;

storiesOf("Jumbotron", module)
	.add("init", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.reset();
		axiosMock.onGet(`${SERVICE_API}/word`).reply(200, { words, next: 5 });

		return (
			<MemoryRouter>
				<Jumbotron/>
			</MemoryRouter>
		);
	});