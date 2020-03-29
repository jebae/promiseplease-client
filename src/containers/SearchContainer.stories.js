import React from "react";
import axios from "axios";
import { storiesOf } from "@storybook/react";
import SearchContainer from "./SearchContainer";
import { MemoryRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";

const words = {
	"홍" : [
		{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "지역" },
		{ word: "홍록기", city: "대전", constituency: "서구을", type: "지역" },
		{ word: "홍삼", city: "무안", constituency: "일로", type: "후보" },
		{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "지역" },
		{ word: "홍록기", city: "대전", constituency: "서구을", type: "지역" },
		{ word: "홍삼", city: "무안", constituency: "일로", type: "후보" },
	],
	"홍길" : [
		{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "지역" },
	],
	"오" : [
		{ word: "오호라", city: "서울", constituency: "종로구갑", type: "지역" },
		{ word: "오갱끼데스까", city: "대전", constituency: "서구을", type: "지역" },
		{ word: "오뎅", city: "무안", constituency: "일로", type: "후보" },
		{ word: "오산 신촌동", city: "서울", constituency: "종로구갑", type: "지역" },
		{ word: "오시오 칼국수", city: "대전", constituency: "서구을", type: "지역" },
		{ word: "오랑캐", city: "무안", constituency: "일로", type: "후보" },
	],
	"오시": [
		{ word: "오시오 칼국수", city: "대전", constituency: "서구을", type: "지역" },
	]
};
const SERVICE_API = process.env.SERVICE_API;

storiesOf("SearchContainer", module)
	.add("no autocomplete", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.onGet(`${SERVICE_API}/word`)
			.reply(200, { words: [], next: null });

		return (
			<MemoryRouter>
				<SearchContainer/>
			</MemoryRouter>
		);
	})
	.add("autocomplete", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock
			.onGet(`${SERVICE_API}/word`, { params: { text: "오" } })
			.reply(200, { words: words["오"], next: 5 })
			.onGet(`${SERVICE_API}/word`, { params: { text: "오", next: 5 } })
			.reply(200, { words: words["오"], next: null })
			.onGet(`${SERVICE_API}/word`, { params: { text: "홍" } })
			.reply(200, { words: words["홍"], next: 5 })
			.onGet(`${SERVICE_API}/word`, { params: { text: "홍", next: 5 } })
			.reply(200, { words: words["홍"], next: null })
			.onGet(`${SERVICE_API}/word`, { params: { text: "홍길"  } })
			.reply(200, { words: words["홍길"], next: null })
			.onGet(`${SERVICE_API}/word`, { params: { text: "오시"  } })
			.reply(200, { words: words["오시"], next: null })
			.onGet(`${SERVICE_API}/word`)
			.reply(200, { words:[], next: null });

		return (
			<MemoryRouter>
				<SearchContainer/>
			</MemoryRouter>
		);
	})