import React from "react";
import { shallow } from "enzyme";
import CategoryCountByCityChart from "./CategoryCountByCityChart";

describe("CategoryCountByCityChart", () => {
	test("render", () => {
		const wrapper = shallow(
			<CategoryCountByCityChart
				data={ [] }
				keys={ [] }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
	});
});