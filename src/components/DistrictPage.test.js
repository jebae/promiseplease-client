import React from "react";
import { shallow } from "enzyme";
import DistrictPage from "./DistrictPage";

describe("DistrictPage", () => {
	test("render", () => {
		const wrapper = shallow(
			<DistrictPage
				genderCount={ { man: 2, woman: 1 } }
				avgAge={ 46 }
				notifyCandidateGeneralInfo={ jest.fn() }
				fetchCountUp={ jest.fn() }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
	});
});