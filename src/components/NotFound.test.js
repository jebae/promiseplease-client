import React from "react";
import { shallow } from "enzyme";
import NotFound from "./NotFound";

describe("NotFound", () => {
	test("render", () => {
		const context = {};
		const wrapper = shallow(
			<NotFound staticContext={ context } />
		);

		expect(wrapper.exists()).toEqual(true);
		expect(context.status).toEqual(404);
	});
});