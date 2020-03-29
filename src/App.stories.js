import React from "react";
import { storiesOf } from "@storybook/react";
import StoryRouter from "storybook-react-router";
import { MemoryRouter, Link } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "./App";

const SERVICE_API = process.env.SERVICE_API;
const candidates = {
	seoul: [
		{
			number: 1,
			name: "류현진",
			birth: "1967-02-01",
			gender: "man",
			party: "닫힌우리당",
			promises: [
				{
					cat: [ "경제", "중소기업" ],
					content: "대법관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다.",
				},
				{
					cat: [ "환경" ],
					content: "사면·감형 및 복권에 관한 사항은 법률로 정한다.",
				},
				{
					cat: [ "교육" ],
					content: "모든 국민은 보건에 관하여 국가의 보호를 받는다.",
				},
				{
					cat: [ "환경", "의료" ],
					content: "국회의 정기회는 법률이 정하는 바에 의하여 매년 1회 집회되며, 국회의 임시회는 대통령 또는 국회재적의원 4분의 1 이상의 요구에 의하여 집회된다.",
				},
			],
			careers: [
				"삼성전자 대리",
				"Y combinator Security guard",
				"LG CNS 대표이사"
			],
			color: "006400"
		},
		{
			number: 2,
			name: "박찬호",
			birth: "1972-11-11",
			gender: "man",
			party: "미국당",
			promises: [
				{
					cat: [ "경제", "중소기업" ],
					content: "정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.",
				},
				{
					cat: [ "교육" ],
					content: "광물 기타 중요한 지하자원·수산자원·수력과 경제상 이용할 수 있는 자연력은 법률이 정하는 바에 의하여 일정한 기간 그 채취·개발 또는 이용을 특허할 수 있다.",
				},
				{
					cat: [ "중소기업" ],
					content: "각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.",
				},
			],
			careers: [
				"메이져리그 다승왕",
				"KBO 올해의 선수",
				"KBO 총재"
			],
			color: "FF0000"
		},
		{
			number: 3,
			name: "스탠 션파이크",
			birth: "1980-12-25",
			gender: "woman",
			party: "무가당",
			promises: [
				{
					cat: [ "경제" ],
					content: "헌법재판소는 법률에 저촉되지 아니하는 범위안에서 심판에 관한 절차, 내부규율과 사무처리에 관한 규칙을 제정할 수 있다.",
				},
				{
					cat: [ "교육" ],
					content: "국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.",
				},
				{
					cat: [ "균형발전" ],
					content: "대통령이 임시회의 집회를 요구할 때에는 기간과 집회요구의 이유를 명시하여야 한다.",
				},
			],
			careers: [
				"구조버스 차장",
				"호그와트 사냥터지기",
			],
			color: "2874A6" 
		}
	],
	daejeon: [
		{
			number: 1,
			name: "오리온",
			birth: "1967-02-01",
			gender: "woman",
			party: "닫힌우리당",
			promises: [
				{
					cat: [ "경제", "중소기업" ],
					content: "대법관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다.",
				},
				{
					cat: [ "환경" ],
					content: "사면·감형 및 복권에 관한 사항은 법률로 정한다.",
				},
				{
					cat: [ "교육" ],
					content: "모든 국민은 보건에 관하여 국가의 보호를 받는다.",
				},
				{
					cat: [ "환경", "의료" ],
					content: "국회의 정기회는 법률이 정하는 바에 의하여 매년 1회 집회되며, 국회의 임시회는 대통령 또는 국회재적의원 4분의 1 이상의 요구에 의하여 집회된다.",
				},
			],
			careers: [
				"삼성전자 대리",
				"Y combinator Security guard",
				"LG CNS 대표이사"
			],
			color: "006400"
		},
		{
			number: 2,
			name: "스티브 잡스",
			birth: "1972-11-11",
			gender: "man",
			party: "미국당",
			promises: [
				{
					cat: [ "경제", "중소기업" ],
					content: "정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.",
				},
				{
					cat: [ "교육" ],
					content: "광물 기타 중요한 지하자원·수산자원·수력과 경제상 이용할 수 있는 자연력은 법률이 정하는 바에 의하여 일정한 기간 그 채취·개발 또는 이용을 특허할 수 있다.",
				},
				{
					cat: [ "중소기업" ],
					content: "각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.",
				},
			],
			careers: [
				"메이져리그 다승왕",
				"KBO 올해의 선수",
				"KBO 총재"
			],
			color: "FF0000"
		},
		{
			number: 3,
			name: "김동훈",
			birth: "1993-12-25",
			gender: "woman",
			party: "무가당",
			promises: [
				{
					cat: [ "경제" ],
					content: "헌법재판소는 법률에 저촉되지 아니하는 범위안에서 심판에 관한 절차, 내부규율과 사무처리에 관한 규칙을 제정할 수 있다.",
				},
				{
					cat: [ "교육" ],
					content: "국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.",
				},
				{
					cat: [ "균형발전" ],
					content: "대통령이 임시회의 집회를 요구할 때에는 기간과 집회요구의 이유를 명시하여야 한다.",
				},
			],
			careers: [
				"구조버스 차장",
				"호그와트 사냥터지기",
			],
			color: "2874A6" 
		}
	]
}
const wordList = [
	{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "선거구" },
	{ word: "홍록기", city: "대전", constituency: "서구을", type: "선거구" },
	{ word: "홍삼", city: "무안", constituency: "일로", type: "후보" },
	{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "선거구" },
	{ word: "홍록기", city: "대전", constituency: "서구을", type: "선거구" },
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

storiesOf("App", module)
	.addDecorator(StoryRouter())
	.add("HomePage", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock
			.onGet(`${SERVICE_API}/word`).reply(200, { words: wordList, next: 1 })
			.onGet(`${SERVICE_API}/voter/count`).reply(200, { count: voterCount })
			.onGet(`${SERVICE_API}/candidate/count`, { params: {} }).reply(200, { count: candidateCount })
			.onGet(`${SERVICE_API}/candidate/age`, { params: { aggregate: "avg" } }).reply(200, { age: 57 })
			.onGet(`${SERVICE_API}/candidate/age`, { params: { aggregate: "min" } }).reply(200, { age: 36 })
			.onGet(`${SERVICE_API}/candidate/age`, { params: { aggregate: "max" } }).reply(200, { age: 76 })
			.onGet(`${SERVICE_API}/party/count`).reply(200, { count: 21 })
			.onGet(`${SERVICE_API}/candidate/count`, { params: { groupby: JSON.stringify(["gender"]) } }).reply(200, { count: { man: 230, woman: 50 }} )
			.onGet(`${SERVICE_API}/promise/count`, { params: { groupby: JSON.stringify(["category"]) } }).reply(200, { count: categoryCount })
			.onGet(`${SERVICE_API}/promise/count`, { params: { groupby: JSON.stringify(["city", "category"]) } }).reply(200, { count: categoryCountByCity })
			.onGet(`${SERVICE_API}/candidate/count`, { params: { groupby: JSON.stringify(["generation", "job"]) } }).reply(200, { count: jobCountByGeneration })
			.onGet(`${SERVICE_API}/candidate/count`, { params: { groupby: JSON.stringify(["city", "gender"]) } }).reply(200, { count: genderCountByCity })
			.onGet(`${SERVICE_API}/candidate`, { params: { city: "서울", constituency: "종로구갑" } }).reply(200, { candidates: candidates.seoul })
			.onGet(`${SERVICE_API}/candidate`, { params: { city: "대전", constituency: "서구을" } }).reply(200, { candidates: candidates.daejeon })
			.onGet(`${SERVICE_API}/vote-location`).reply(200, { locations })

		return (
			<MemoryRouter initialEntries={[ "/" ]}>
				<App/>
			</MemoryRouter>
		);
	})
	.add("DistrictPage", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });
		axiosMock
			.onGet(`${SERVICE_API}/word`).reply(200, { words: wordList, next: 1 })
			.onGet(`${SERVICE_API}/candidate`).reply(200, { candidates: candidates.seoul })
			.onGet(`${SERVICE_API}/vote-location`).reply(200, { locations })

		return (
			<MemoryRouter initialEntries={[ "/constituency/서울/은평구을" ]}>
				<App/>
			</MemoryRouter>
		);
	})
	.add("404 not found", () => {
		return (
			<MemoryRouter initialEntries={[ "/notexist" ]}>
				<App/>
			</MemoryRouter>
		);
	})