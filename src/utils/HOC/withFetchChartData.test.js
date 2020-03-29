import React from "react";
import { mount } from "enzyme";
import DumbFactory from "../../../.test_utils/DumbComponent";
import withFetchChartData from "./withFetchChartData";

describe("withFetchChartData", () => {
	const HOC = withFetchChartData({})(null);
	const dumbFactory = DumbFactory({
		state: {
			data: {},
			fail: false,
		},
		methods : {
			getKeys: HOC.prototype.getKeys,
		}
	});

	const ExampleComponent = function (props) {
		return <div></div>;
	}

	test("render", () => {
		const otherProp = "foo";
		const fetch = jest.fn(() => Promise.resolve({}));
		const WithFetchChartData = withFetchChartData({ fetch })(ExampleComponent);
		const wrapper = mount(
			<WithFetchChartData
				otherProp={ otherProp }
				fetchCountUp={ jest.fn() }
			/>
		);
		const wrappedComponent = wrapper.find(WithFetchChartData.WrappedComponent);

		expect(wrapper.exists()).toEqual(true);
		expect(wrapper.state("data")).toEqual({});
		expect(wrapper.state("fail")).toEqual(false);
		expect(wrappedComponent.exists()).toEqual(true);
		expect(wrappedComponent.props().data).toEqual({});
		expect(wrappedComponent.props().otherProp).toEqual(otherProp);
	});

	test("render (response 200)", () => {
		const resSuccess = {
			status: 200,
			data: {
				foo: [ {}, {} ]
			}
		}
		const fetch = jest.fn(() => Promise.resolve(resSuccess));
		const WithFetchChartData = withFetchChartData({ fetch })(ExampleComponent);
		const fetchCountUp = jest.fn();
		let wrapper;

		return new Promise((resolve, reject) => {
			wrapper = mount(
				<WithFetchChartData
					fetchCountUp={ fetchCountUp }
				/>
			);
			setImmediate(resolve);
		})
		.then(() => { wrapper.update() })
		.then(() => {
			const wrappedComponent = wrapper.find(WithFetchChartData.WrappedComponent);
			expect(wrapper.state("data")).toEqual(resSuccess.data);
			expect(wrapper.state("fail")).toEqual(false);
			expect(wrappedComponent.exists()).toEqual(true);
			expect(wrappedComponent.props().data).toEqual(resSuccess.data);
			expect(fetchCountUp).toHaveBeenCalledTimes(1);
		})
	});

	test("render (response 500)", () => {
		const fetch = jest.fn(() => Promise.resolve({ status: 500 }));
		const WithFetchChartData = withFetchChartData({ fetch })(ExampleComponent);
		const fetchCountUp = jest.fn();
		let wrapper;

		return new Promise((resolve, reject) => {
			wrapper = mount(
				<WithFetchChartData
					fetchCountUp={ fetchCountUp }
				/>
			);
			setImmediate(resolve);
		})
		.then(() => { wrapper.update() })
		.then(() => {
			expect(wrapper.state("data")).toEqual({});
			expect(wrapper.state("fail")).toEqual(true);
			expect(wrapper.find(WithFetchChartData.WrappedComponent).exists()).toEqual(false);
			expect(fetchCountUp).toHaveBeenCalledTimes(1);
		})
	});

	test("render (response error)", () => {
		const fetch = jest.fn(() => Promise.reject());
		const WithFetchChartData = withFetchChartData({ fetch })(ExampleComponent);
		const fetchCountUp = jest.fn();
		let wrapper;

		return new Promise((resolve, reject) => {
			wrapper = mount(
				<WithFetchChartData
					fetchCountUp={ fetchCountUp }
				/>
			);
			setImmediate(resolve);
		})
		.then(() => { wrapper.update() })
		.then(() => {
			expect(wrapper.state("data")).toEqual({});
			expect(wrapper.state("fail")).toEqual(true);
			expect(wrapper.find(WithFetchChartData.WrappedComponent).exists()).toEqual(false);
			expect(fetchCountUp).toHaveBeenCalledTimes(1);
		})
	});

	describe("Method", () => {
		test("getKeys (1 exclude)", () => {
			const dumb = new dumbFactory();
			const data = [
				{ city: "서울", "경제": 230, "의료": 100, "환경": 30, "교통": 20, "아동 및 육아": 19, "치안": 4, },
				{ city: "대전", "경제": 120, "의료": 103, "환경": 21, "교통": 40, "교육": 3, },
				{ city: "세종", "경제": 60, "의료": 32, "환경": 67, "아동 및 육아": 19, "치안": 43, },
				{ city: "제주", "의료": 34, "환경": 10, "치안": 21, },
				{ city: "전남", "경제": 110, "환경": 21, "교통": 78, "아동 및 육아": 17, "치안": 3, },
				{ city: "충북", "경제": 64, "환경": 12, "교통": 38, },
			];

			expect(dumb.getKeys(data, ["city"]))
				.toEqual(new Set([ "경제", "의료", "환경", "교통", "아동 및 육아", "치안", "교육" ]));
		});

		test("getKeys (multi exclude)", () => {
			const dumb = new dumbFactory();
			const data = [
				{ city: "서울", "경제": 230, "의료": 100, "환경": 30, "교통": 20, "아동 및 육아": 19, "치안": 4, },
				{ city: "대전", "경제": 120, "의료": 103, "환경": 21, "교통": 40, "교육": 3, },
				{ city: "세종", "경제": 60, "의료": 32, "환경": 67, "아동 및 육아": 19, "치안": 43, },
				{ city: "제주", "의료": 34, "환경": 10, "치안": 21, },
				{ city: "전남", "경제": 110, "환경": 21, "교통": 78, "아동 및 육아": 17, "치안": 3, },
				{ city: "충북", "경제": 64, "환경": 12, "교통": 38, },
			];

			expect(dumb.getKeys(data, ["city", "경제"]))
				.toEqual(new Set([ "의료", "환경", "교통", "아동 및 육아", "치안", "교육" ]));
		});
	});
});