import React from "react";
import { shallow } from "enzyme";
import JobCountByGenerationChart from "./JobCountByGenerationChart";

describe("JobCountByGenerationChart", () => {
	test("render", () => {
		const wrapper = shallow(
			<JobCountByGenerationChart
				data={ [] }
				keys={ [] }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
	});
});