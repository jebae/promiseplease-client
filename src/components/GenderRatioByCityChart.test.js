import React from "react";
import { shallow } from "enzyme";
import GenderRatioByCityChart from "./GenderRatioByCityChart";

describe("GenderRatioByCityChart", () => {
	test("render", () => {
		const wrapper = shallow(
			<GenderRatioByCityChart
				data={ [] }
				keys={ [] }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
	});
});