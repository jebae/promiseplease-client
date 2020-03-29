import React from "react";
import { shallow, mount } from "enzyme";
import VoterCandidateCountContainer from "./VoterCandidateCountContainer";
import axios from "axios";
import countUp from "../utils/countUpAnimation";

describe("VoterCandidateCountContainer", () => {
	const baseRes = {
		status: 200,
		data: {}
	}
	const voterCountRes = {
		...baseRes,
		data: {
			count: 387600000
		}
	};
	const candidateCountRes = {
		...baseRes,
		data: {
			count: 689
		}
	};

	beforeEach(() => {
		countUp.mockImplementation(() => {});
		axios.get.mockImplementation((url) => {
			if (url.includes("/voter/count"))
				return Promise.resolve(voterCountRes);
			else if (url.includes("/candidate/count"))
				return Promise.resolve(candidateCountRes);
		});
	});

	test("render", () => {
		let wrapper;
		const fetchCountUp = jest.fn();

		return new Promise((resolve, reject) => {
			wrapper = shallow(
				<VoterCandidateCountContainer
					fetchCountUp={ fetchCountUp }
				/>
			);
			expect(wrapper.exists()).toEqual(true);
			expect(wrapper.state("voterCount")).toEqual(0);
			expect(wrapper.state("candidateCount")).toEqual(0);
			setImmediate(resolve);
		})
		.then(() => { wrapper.update(); })
		.then(() => {
			expect(wrapper.state("voterCount")).toEqual(voterCountRes.data.count);
			expect(wrapper.state("candidateCount")).toEqual(candidateCountRes.data.count);
			expect(fetchCountUp).toHaveBeenCalledTimes(2);
		});
	});

	afterEach(() => {
		countUp.mockReset();
		axios.get.mockReset();
	});
});