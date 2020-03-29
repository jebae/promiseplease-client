import React from "react";
import { shallow } from "enzyme";
import HomePage from "./HomePage";

describe("HomePage", () => {
	test("render", () => {
		const wrapper = shallow(<HomePage/>);

		expect(wrapper.exists()).toEqual(true);
	});
});