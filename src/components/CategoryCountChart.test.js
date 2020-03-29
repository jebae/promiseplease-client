import React from "react";
import { shallow } from "enzyme";
import CategoryCountChart from "./CategoryCountChart";

describe("CategoryCountChart", () => {
	test("render", () => {
		const wrapper = shallow(
			<CategoryCountChart
				data={ [] }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
	});
});