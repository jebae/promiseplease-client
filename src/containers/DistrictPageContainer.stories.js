import React from "react";
import axios from "axios";
import { storiesOf } from "@storybook/react";
import withMemoryRouter from "../../.test_utils/withMemoryRouter";
import MockAdapter from "axios-mock-adapter";
import DistrictPageContainer from "./DistrictPageContainer";

const SERVICE_API = process.env.SERVICE_API;
const candidates = [
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

storiesOf("DistrictPageContainer", module)
	.add("init", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 2000 });
		
		axiosMock
			.onGet(`${SERVICE_API}/candidate`).reply(200, { candidates })
			.onGet(`${SERVICE_API}/vote-location`).reply(200, { locations });
		const Component = withMemoryRouter({
			path: "/constituency/:city/:constituency",
			initialEntry: "/constituency/서울/은평구을"
		})(DistrictPageContainer);

		return (<Component/>);
	})