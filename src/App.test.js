import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import App from "./App";
import HomePage from "./components/HomePage";
import DistrictPageContainer from "./containers/DistrictPageContainer";
import NotFound from "./components/NotFound";
import * as GA from "./services/GA";

describe("App", () => {
	const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
	jest.spyOn(GA, "loadGA").mockImplementation(() => {});

	beforeEach(() => {
		axios.get.mockReturnValue(Promise.resolve([]));
	});

	afterEach(() => {
		consoleError.mockReset();
		axios.get.mockReset();
	});

	test("render", () => {
		const wrapper = shallow(<App/>);

		expect(wrapper.exists()).toEqual(true);
	});

	test("render ( / )", () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={ ["/"] }>
				<App/>
			</MemoryRouter>
		);

		expect(wrapper.find(HomePage).exists()).toEqual(true);
	});

	test("render ( /constituency/:city/:constituency )", () => {
		let wrapper;

		return new Promise((resolve, reject) => {
			wrapper = mount(
				<MemoryRouter initialEntries={ ["/constituency/서울/은평구을"] }>
					<App/>
				</MemoryRouter>
			);
			setImmediate(resolve);
		})
		.then(() => { wrapper.update() })
		.then(() => {
			expect(wrapper.find(HomePage).exists()).toEqual(false);
			expect(wrapper.find(DistrictPageContainer).exists()).toEqual(true);
		})
	});

	test("render (/notexist)", () => {
		const wrapper = mount(
			<MemoryRouter initialEntries={ ["/notexist"] }>
				<App/>
			</MemoryRouter>
		);

		expect(wrapper.find(NotFound).exists()).toEqual(true);
	});
});