import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";

describe("Footer", () => {
	test("render", () => {
		const wrapper = shallow(
			<Footer/>
		);

		expect(wrapper.exists()).toEqual(true);
	});
});