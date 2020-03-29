import React from "react";
import { shallow } from "enzyme";
import DDay from "./DDay";

describe("DDAY", () => {
	const realDateNow = Date.now.bind(global.Date);

	beforeAll(() => {
		global.Date.now = jest.fn(() => (new Date("Apr 12 2020 00:00:00 GMT+0900")).getTime());
	});

	afterAll(() => {
		global.Date.now = realDateNow;
	});

	test("render", () => {
		const wrapper = shallow(<DDay/>);

		expect(wrapper.exists()).toEqual(true);
	});

	test("render (3 days before)", () => {
		global.Date.now = jest.fn(() => (new Date("Apr 12 2020 00:00:00 GMT+0900")).getTime());
		const wrapper = shallow(<DDay/>);

		expect(wrapper.find(".DDay-DayCount").text()).toEqual("D - 3");
	});

	test("render (1 hour before)", () => {
		global.Date.now = jest.fn(() => (new Date("Apr 14 2020 23:00:00 GMT+0900")).getTime());
		const wrapper = shallow(<DDay/>);

		expect(wrapper.find(".DDay-DayCount").text()).toEqual("D - 1");
	});

	test("render (dday)", () => {
		global.Date.now = jest.fn(() => (new Date("Apr 15 2020 00:00:00 GMT+0900")).getTime());
		const wrapper = shallow(<DDay/>);

		expect(wrapper.find(".DDay-DayCount").text()).toEqual("D - Day");
	});

	test("render (3 hours after)", () => {
		global.Date.now = jest.fn(() => (new Date("Apr 15 2020 03:00:00 GMT+0900")).getTime());
		const wrapper = shallow(<DDay/>);

		expect(wrapper.find(".DDay-DayCount").text()).toEqual("D - Day");
	});

	test("render (1 day after)", () => {
		global.Date.now = jest.fn(() => (new Date("Apr 16 2020 00:00:00 GMT+0900")).getTime());
		const wrapper = shallow(<DDay/>);

		expect(wrapper.find(".DDay-DayCount").text()).toEqual("D + 1");
	});
});