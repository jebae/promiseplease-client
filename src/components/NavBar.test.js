import React from "react";
import { MemoryRouter, Link } from "react-router-dom";
import { shallow, mount } from "enzyme";
import NavBar from "./NavBar";
import SearchContainer from "../containers/SearchContainer";

describe("NavBar", () => {
	test("render", () => {
		const wrapper = mount(
			<MemoryRouter>
				<NavBar/>
			</MemoryRouter>
		);

		expect(wrapper.exists()).toBe(true);
		expect(wrapper.find(".NavBar-Icon_toHome")).toHaveLength(1);
		expect(wrapper.find(".NavBar-Title")).toHaveLength(1);
		expect(wrapper.find(SearchContainer)).toHaveLength(1);

		expect(wrapper.find(Link).first().props().to).toEqual("/");
		expect(wrapper.find(Link).at(1).props().to).toEqual("/");
	});
});