import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import RouteTracker from "./RouteTracker";
import * as GA from "../services/GA";

describe("RouteTracker", () => {
	const windowScrollToSpy = jest.spyOn(global.window, "scrollTo")
		.mockImplementation(() => {});
	const gaPageSpy = jest.spyOn(GA, "gaPage");

	afterEach(() => {
		windowScrollToSpy.mockReset();
		gaPageSpy.mockReset();
	});

	test("location change", () => {
		const wrapper = mount(
			<RouteTracker.WrappedComponent
				location={{ pathname: "/" }}
			/>
		);

		expect(windowScrollToSpy).toHaveBeenCalledTimes(1);
		expect(gaPageSpy).toHaveBeenCalledTimes(1);
		expect(gaPageSpy).toHaveBeenCalledWith("/");
		wrapper.setProps({ location: { pathname: "/other" } });
		expect(windowScrollToSpy).toHaveBeenCalledTimes(2);
		expect(gaPageSpy).toHaveBeenCalledTimes(2);
		expect(gaPageSpy).toHaveBeenCalledWith("/other");
	});

	test("location same", () => {
		const wrapper = mount(
			<RouteTracker.WrappedComponent
			location={{ pathname: "/" }}
			/>
		);

		expect(windowScrollToSpy).toHaveBeenCalledTimes(1);
		expect(gaPageSpy).toHaveBeenCalledTimes(1);
		expect(gaPageSpy).toHaveBeenCalledWith("/");
		wrapper.setProps({ location: { pathname: "/" } });
		expect(windowScrollToSpy).toHaveBeenCalledTimes(1);
		expect(gaPageSpy).toHaveBeenCalledTimes(1);
	});
});