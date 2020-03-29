import React from "react";
import { mount } from "enzyme";
import GeneralInfo from "./GeneralInfo";
import countUp from "../utils/countUpAnimation";

describe("GeneralInfo", () => {
	beforeEach(() => {
		countUp.mockImplementation(() => {});
	});

	test("render", () => {
		const wrapper = mount(
			<GeneralInfo
				avgAge={ 0 }
				minAge={ 0 }
				maxAge={ 0 }
				partyCount={ 0 }
				manRatio={ 0 }
				womanRatio={ 0 }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
	});

	afterEach(() => {
		countUp.mockReset();
	});
});