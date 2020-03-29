import React from "react";
import { shallow, mount } from "enzyme";
import withMemoryRouter from "../../.test_utils/withMemoryRouter";
import VoteLocationContainer from "./VoteLocationContainer";
import axios from "axios";
import DumbFactory from "../../.test_utils/DumbComponent";

describe("VoteLocationContainer", () => {
	let consoleError;
	const realDateNow = Date.now.bind(global.Date);
	const dumbFactory = DumbFactory({
		state: {
			locations: [],
			currentDistrict: null,
			currentType: "사전",
		},
		methods: {
			getVoteLocations: VoteLocationContainer.WrappedComponent.prototype.getVoteLocations,
			changeDistrict: VoteLocationContainer.WrappedComponent.prototype.changeDistrict,
			changeType: VoteLocationContainer.WrappedComponent.prototype.changeType,
			findIndexOfDistrict: VoteLocationContainer.WrappedComponent.prototype.findIndexOfDistrict,
		}
	});
	const locations = [
		{
			name: "종로구",
			locations: [
				{
					address: "서울특별시 종로구 종로1.2.3.4가동 81-2",
					latitude: 37.572036,
					longitude: 126.976594,
					type: "사전"
				},
				{
					address: "서울특별시 종로구 내수동 30-1",
					latitude: 37.573800,
					longitude: 126.972732,
					type: "당일"
				},
			]
		},
		{
			name: "마포구",
			locations: [
				{
					address: "서울특별시 종로구 청운효자동 자하문로17길",
					latitude: 37.581802,
					longitude: 126.969253,
					type: "사전"
				},
				{
					address: "서울특별시 종로구 삼청동 63-18",
					latitude: 37.583043,
					longitude: 126.981977,
					type: "당일"
				},
				{
					address: "서울특별시 종로구 종로1.2.3.4가동 인사동10길",
					latitude: 37.574321,
					longitude: 126.985516,
					type: "당일"
				},
			]
		},
		{
			name: "은평구",
			locations: [
				{
					address: "서울특별시 종로구 종로1.2.3.4가동 103-2",
					latitude: 37.569792,
					longitude: 126.980448,
					type: "사전"
				},
				{
					address: "서울특별시 중구 정동 1-36",
					latitude: 37.567623,
					longitude: 126.973367,
					type: "당일"
				},
			]
		},
	];
	const res = {
		status: 200,
		data: { locations },
	};
	const city = "대전";
	const constituency = "서구을";

	beforeEach(() => {
		consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		global.Date.now = realDateNow;
		consoleError.mockRestore();
	});

	describe("render", () => {
		const testRender = (check) => {
			let wrapper;
			let component;

			axios.get.mockReturnValue(Promise.resolve(res));
			return new Promise(resolve => {
				const Component = withMemoryRouter({
					initialEntry: `/constituency/${city}/${constituency}`,
					path: "/constituency/:city/:constituency",
				})(VoteLocationContainer);
				wrapper = mount(
					<Component
						fetchCountUp={ jest.fn() }
					/>
				);
				component = wrapper.find(VoteLocationContainer.WrappedComponent);
				check(component);
				setImmediate(resolve);
			});
		}

		test("before pre vote", () => {
			global.Date.now = jest.fn(() => (new Date("Apr 10 2020 00:00:00 GMT+0900")).getTime());
			const check = (component) => {
				expect(component.state("locations")).toHaveLength(0);
				expect(component.state("currentDistrict")).toEqual(-1);
				expect(component.state("currentType")).toEqual("사전");
			}

			testRender(check);
		});

		test("after pre vote", () => {
			global.Date.now = jest.fn(() => (new Date("Apr 11 2020 18:01:00 GMT+0900")).getTime());
			const check = (component) => {
				expect(component.state("locations")).toHaveLength(0);
				expect(component.state("currentDistrict")).toEqual(-1);
				expect(component.state("currentType")).toEqual("당일");
			}

			testRender(check);
		});
	});

	describe("Methods", () => {
		describe("findIndexOfDistrict", () => {
			const locations = [
				{ name: "마포구" },
				{ name: "은평구" },
				{ name: "서구" },
			];

			test("exist", () => {
				const dumb = new dumbFactory();

				expect(dumb.findIndexOfDistrict(locations, "은평구")).toEqual(1);
			});

			test("not exist", () => {
				const dumb = new dumbFactory();

				expect(dumb.findIndexOfDistrict(locations, "없는구")).toEqual(-1);
			});

			test("undefined", () => {
				const dumb = new dumbFactory();

				expect(dumb.findIndexOfDistrict(locations, undefined)).toEqual(-1);
			});
		});

		describe("getVoteLocations", () => {
			const fetchCountUp = jest.fn();

			afterEach(() => {
				fetchCountUp.mockReset();
			});

			test("200", () => {
				const dumb = new dumbFactory({
					match: {
						params: { city, constituency }
					},
					fetchCountUp,
				});
				axios.get.mockReturnValue(Promise.resolve(res));
	
				return new Promise(resolve => {
					dumb.getVoteLocations();
					setImmediate(resolve);
				})
				.then(() => {
					expect(dumb.state.locations).toEqual(locations);
					expect(dumb.state.currentDistrict).toEqual(0);
					expect(fetchCountUp).toHaveBeenCalledTimes(1);
				});
			});
	
			test("500", () => {
				const dumb = new dumbFactory({
					match: {
						params: { city, constituency }
					},
					fetchCountUp,
				});
				axios.get.mockReturnValue(Promise.resolve({ status: 500 }));
				
				return new Promise(resolve => {
					dumb.getVoteLocations();
					setImmediate(resolve);
				})
				.then(() => {
					expect(consoleError).toHaveBeenCalledTimes(1);
					expect(fetchCountUp).toHaveBeenCalledTimes(1);
				});
			});
	
			test("error", () => {
				const dumb = new dumbFactory({
					match: {
						params: { city, constituency }
					},
					fetchCountUp,
				});
				axios.get.mockReturnValue(Promise.reject());
				
				return new Promise(resolve => {
					dumb.getVoteLocations();
					setImmediate(resolve);
				})
				.then(() => {
					expect(consoleError).toHaveBeenCalledTimes(1);
					expect(fetchCountUp).toHaveBeenCalledTimes(1);
				});
			});
		});

		describe("changeDistrict", () => {
			test("different", () => {
				const dumb = new dumbFactory({});
				const i = 1;

				dumb.state.currentDistrict = 0;
				dumb.changeDistrict(i);
				expect(dumb.state.currentDistrict).toEqual(i);
			});

			test("same", () => {
				const dumb = new dumbFactory({});
				const i = 1;

				dumb.state.currentDistrict = i;
				dumb.changeDistrict(i);
				expect(dumb.state.currentDistrict).toEqual(i);
			});
		});

		describe("changeType", () => {
			test("different", () => {
				const dumb = new dumbFactory({});

				dumb.state.currentType = "당일";
				dumb.changeType("사전");
				expect(dumb.state.currentType).toEqual("사전");
			});

			test("different", () => {
				const dumb = new dumbFactory({});

				dumb.state.currentType = "당일";
				dumb.changeType("당일");
				expect(dumb.state.currentType).toEqual("당일");
			});
		});
	});


	describe("Props", () => {
		test("match.params", () => {
			const otherCity = "대전";
			const otherDistrict = "서구갑";
			const wrapper = shallow(
				<VoteLocationContainer.WrappedComponent
					match={ { params: { city, constituency } } }
					fetchCountUp={ jest.fn() }
				/>
			);
	
			jest.spyOn(wrapper.instance(), "getVoteLocations")
				.mockImplementation(() => {});
			wrapper.setProps({ match: { params: { city: otherCity, constituency: otherDistrict } } });
			expect(wrapper.instance().getVoteLocations).toHaveBeenCalledTimes(1);
		});
	});
});