import React from "react";
import { storiesOf } from "@storybook/react";
import Candidate from "./Candidate";

const props = {
	number: 1,
	name: "류현진",
	birth: "1967-02-01",
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
	color: { start: "#98FB98", end: "#006400" }
}

storiesOf("Candidate", module)
	.add("init", () => {
		return (
			<Candidate
				number={ props.number }
				name={ props.name }
				birth={ props.birth }
				party={ props.party }
				promiseCats={ props.promiseCats }
				promises={ props.promises }
				careers={ props.careers }
				color={ props.color }
			/>
		);
	})
	.add("no promises", () => {
		return (
			<Candidate
				number={ props.number }
				name={ props.name }
				birth={ props.birth }
				party={ props.party }
				// promiseCats={ props.promiseCats }
				// promises={ props.promises }
				careers={ props.careers }
				color={ props.color }
			/>
		);
	})
	.add("no careers", () => {
		return (
			<Candidate
				number={ props.number }
				name={ props.name }
				birth={ props.birth }
				party={ props.party }
				promiseCats={ props.promiseCats }
				promises={ props.promises }
				// careers={ props.careers }
				color={ props.color }
			/>
		);
	})
	.add("no careers, promises", () => {
		return (
			<Candidate
				number={ props.number }
				name={ props.name }
				birth={ props.birth }
				party={ props.party }
				// promiseCats={ props.promiseCats }
				// promises={ props.promises }
				// careers={ props.careers }
				color={ props.color }
			/>
		);
	})