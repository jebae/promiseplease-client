import React from "react";
import { shallow } from "enzyme";
import Jumbotron from "./Jumbotron";

describe("Jumbotron", () => {
	test("render", () => {
		const wrapper = shallow(<Jumbotron/>);

		expect(wrapper.exists()).toEqual(true);
	});
});