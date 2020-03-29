import React from "react";
import { shallow, mount } from "enzyme";
import DistrictDesc from "./DistrictDesc";

describe("DistrictDesc", () => {
	const descSample = {
		city: "서울",
		constituency: "마포구을",
		avgAge: 54,
		manCount: 4,
		womanCount: 2
	};

	test("render", () => {
		const wrapper = shallow(
			<DistrictDesc.WrappedComponent
				match={{ params: { city: descSample.city, constituency: descSample.constituency } }}
				avgAge={ descSample.avgAge }
				manCount={ descSample.manCount }
				womanCount={ descSample.womanCount }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
	});

	describe("Props", () => {
		test("no avgAge", () => {
			const wrapper = mount(
				<DistrictDesc.WrappedComponent
					match={{ params: { city: descSample.city, constituency: descSample.constituency } }}
					// avgAge={ descSample.avgAge }
					manCount={ descSample.manCount }
					womanCount={ descSample.womanCount }
				/>
			);

			expect(wrapper.find(".DistrictDesc-AvgAge").exists()).toEqual(false);
		});

		test("no manCount, womanCount", () => {
			const wrapper = mount(
				<DistrictDesc.WrappedComponent
					match={{ params: { city: descSample.city, constituency: descSample.constituency } }}
					avgAge={ descSample.avgAge }
					// manCount={ descSample.manCount }
					// womanCount={ descSample.womanCount }
				/>
			);

			expect(wrapper.find(".DistrictDesc-GenderCount").exists()).toEqual(false);
		});
	});
});