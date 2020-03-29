import React from "react";
import { shallow } from "enzyme";
import countUp from "../utils/countUpAnimation";
import VoterCandidateCount from "./VoterCandidateCount";

describe("VoterCandidateCount", () => {
	beforeEach(() => {
		countUp.mockImplementation(() => {});
	});

	test("render", () => {
		
		const wrapper = shallow(
			<VoterCandidateCount
				voterCount={ 0 }
				candidateCount={ 0 }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
	});

	afterEach(() => {
		countUp.mockReset();
	});
});