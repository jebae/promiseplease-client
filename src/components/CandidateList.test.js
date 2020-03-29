import React from "react";
import { shallow, mount } from "enzyme";
import CandidateList from "./CandidateList";
import Candidate from "../components/Candidate";
import CandidateIndex from "../components/CandidateIndex";

describe("CandidateList", () => {
	const candidates = [
		{
			number: 1,
			name: "류현진",
			birth: "1967-02-01",
			gender: "man",
			party: "닫힌우리당",
			promiseCats: [
				{ cat: "경제", count: 2 },
				{ cat: "의료", count: 1 },
				{ cat: "벤처기업", count: 1 },
			],
			promises: [
				"대법관의 임기는 6년으로 하며, 법률이 정하는 바에 의하여 연임할 수 있다.",
				"사면·감형 및 복권에 관한 사항은 법률로 정한다.",
				"모든 국민은 보건에 관하여 국가의 보호를 받는다.",
				"국회의 정기회는 법률이 정하는 바에 의하여 매년 1회 집회되며, 국회의 임시회는 대통령 또는 국회재적의원 4분의 1 이상의 요구에 의하여 집회된다."
			],
			careers: [
				"삼성전자 대리",
				"Y combinator Security guard",
				"LG CNS 대표이사"
			],
			color: { start: "#006400", end: "#343434" }
		},
		{
			number: 2,
			name: "박찬호",
			birth: "1972-11-11",
			gender: "man",
			party: "미국당",
			promiseCats: [
				{ cat: "경제", count: 2 },
				{ cat: "의료", count: 1 },
				{ cat: "벤처기업", count: 1 },
			],
			promises: [
				"정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.",
				"광물 기타 중요한 지하자원·수산자원·수력과 경제상 이용할 수 있는 자연력은 법률이 정하는 바에 의하여 일정한 기간 그 채취·개발 또는 이용을 특허할 수 있다.",
				"각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은 법률로 정한다.",
			],
			careers: [
				"메이져리그 다승왕",
				"KBO 올해의 선수",
				"KBO 총재"
			],
			color: { start: "#006400", end: "#343434" }
		},
		{
			number: 3,
			name: "스탠 션파이크",
			birth: "1980-12-25",
			gender: "woman",
			party: "무가당",
			promiseCats: [
				{ cat: "경제", count: 2 },
				{ cat: "의료", count: 1 },
				{ cat: "벤처기업", count: 1 },
			],
			promises: [
				"헌법재판소는 법률에 저촉되지 아니하는 범위안에서 심판에 관한 절차, 내부규율과 사무처리에 관한 규칙을 제정할 수 있다.",
				"국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다.",
				"대통령이 임시회의 집회를 요구할 때에는 기간과 집회요구의 이유를 명시하여야 한다.",
			],
			careers: [
				"구조버스 차장",
				"호그와트 사냥터지기",
			],
			color: { start: "#006400", end: "#343434" }
		}
	]

	test("render", () => {
		const wrapper = mount(
			<CandidateList
				candidates={ candidates }
			/>
		);

		expect(wrapper.find(Candidate)).toHaveLength(candidates.length);
		expect(wrapper.find(CandidateIndex)).toHaveLength(candidates.length);
	});
});