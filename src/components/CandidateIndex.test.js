import React from "react";
import { shallow, mount } from "enzyme";
import CandidateIndex from "./CandidateIndex";

describe("CandidateIndex", () => {
	const props = {
		number: 1,
		name: "류현진",
		party: "닫힌우리당",
		color: { start: "#FFA500", end: "#000000" }
	}

	test("render", () => {
		const wrapper = shallow(
			<CandidateIndex
				number={ props.number }
				name={ props.name }
				party={ props.party }
				color={ props.color }
				scrollToView={ () => {} }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
	});
});