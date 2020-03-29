import React from "react";
import { mount } from "enzyme";
import ChartLegend from "./ChartLegend";

describe("ChartLegend", () => {
	const data = [
		{ label: "foo", color: "#000000" },
		{ label: "bar", color: "#FFFFFF" },
	];

	test("render", () => {
		const wrapper = mount(
			<ChartLegend data={ data }/>
		);

		expect(wrapper.exists()).toEqual(true);
		expect(wrapper.find("circle")).toHaveLength(data.length);
		expect(wrapper.find("text")).toHaveLength(data.length);
	});
});