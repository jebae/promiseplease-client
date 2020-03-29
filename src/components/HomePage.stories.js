import React from "react";
import axios from "axios";
import { storiesOf } from "@storybook/react";
import HomePage from "./HomePage";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";

const SERVICE_API = process.env.SERVICE_API
const wordList = [
	{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "지역" },
	{ word: "홍록기", city: "대전", constituency: "서구을", type: "지역" },
	{ word: "홍삼", city: "무안", constituency: "일로", type: "후보" },
	{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "지역" },
	{ word: "홍록기", city: "대전", constituency: "서구을", type: "지역" },
	{ word: "홍삼", city: "무안", constituency: "일로", type: "후보" },
];
const voterCount = 38760000;
const candidateCount = 689;
const categoryCount = [
	{ cat: "경제", count: 289 },
	{ cat: "의료", count: 56 },
	{ cat: "환경", count: 121 },
	{ cat: "교통", count: 20 },
	{ cat: "교육", count: 89 },
	{ cat: "아동 및 육아", count: 21 },
	{ cat: "치안", count: 10 },
];
const categoryCountByCity = [
	{ city: "서울", "경제": 230, "의료": 100, "환경": 30, "교통": 20, "아동 및 육아": 19, "치안": 4, },
	{ city: "대전", "경제": 120, "의료": 103, "환경": 21, "교통": 40, "교육": 3, },
	{ city: "세종", "경제": 60, "의료": 32, "환경": 67, "아동 및 육아": 19, "치안": 43, },
	{ city: "제주", "의료": 34, "환경": 10, "치안": 21, },
	{ city: "전남", "경제": 110, "환경": 21, "교통": 78, "아동 및 육아": 17, "치안": 3, },
	{ city: "충북", "경제": 64, "환경": 12, "교통": 38, },
];
const jobCountByGeneration = [
	{ generation: 50, "기업인": 34, "교육자": 10, "법조인": 21, },
	{ generation: 30, "정치인": 120, "기업인": 103, "교육자": 21, "자영업자": 40, "외교관": 3, },
	{ generation: 20, "정치인": 230, "기업인": 100, "교육자": 30, "자영업자": 20, "교수": 19, "법조인": 4, },
	{ generation: 60, "정치인": 110, "교육자": 21, "자영업자": 78, "교수": 17, "법조인": 3, },
	{ generation: 70, "정치인": 64, "교육자": 12, "자영업자": 38, },
	{ generation: 40, "정치인": 60, "기업인": 32, "교육자": 67, "교수": 19, "법조인": 43, },
];
const genderCountByCity = [
	{ city: "서울특별시", "man": 45, "woman": 12 },
	{ city: "대전광역시", "man": 56, "woman": 10 },
	{ city: "세종특별자치시", "man": 56, "woman": 30 },
	{ city: "제주특별자치도", "man": 20, "woman": 3 },
	{ city: "전라남도", "man": 30, "woman": 13 },
	{ city: "충청북도", "man": 45, "woman": 2 },
	{ city: "강원도", "man": 45, "woman": 2 },
];

storiesOf("HomePage", module)
	.add("init", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 2000 });

		axiosMock
			.onGet(`${SERVICE_API}/word`).reply(200, { words: wordList, next: 1 })
			.onGet(`${SERVICE_API}/voter/count`).reply(200, { count: voterCount })
			.onGet(`${SERVICE_API}/candidate/count`, { params: {} }).reply(200, { count: candidateCount })
			.onGet(`${SERVICE_API}/candidate/age`, { params: { aggregate: "avg" } }).reply(200, { age: 57 })
			.onGet(`${SERVICE_API}/candidate/age`, { params: { aggregate: "min" } }).reply(200, { age: 36 })
			.onGet(`${SERVICE_API}/candidate/age`, { params: { aggregate: "max" } }).reply(200, { age: 76 })
			.onGet(`${SERVICE_API}/party/count`).reply(200, { count: 21 })
			.onGet(`${SERVICE_API}/candidate/count`, { params: { groupby: JSON.stringify(["gender"]) } }).reply(200, { count: { man: 230, woman: 50 } })
			.onGet(`${SERVICE_API}/promise/count`, { params: { groupby: JSON.stringify(["category"]) } }).reply(200, { count: categoryCount })
			.onGet(`${SERVICE_API}/promise/count`, { params: { groupby: JSON.stringify(["city", "category"]) } }).reply(200, { count: categoryCountByCity })
			.onGet(`${SERVICE_API}/candidate/count`, { params: { groupby: JSON.stringify(["generation", "job"]) } }).reply(200, { count: jobCountByGeneration })
			.onGet(`${SERVICE_API}/candidate/count`, { params: { groupby: JSON.stringify(["city", "gender"]) } }).reply(200, { count: genderCountByCity })

		return (
			<MemoryRouter>
				<HomePage/>
			</MemoryRouter>
		);
	})