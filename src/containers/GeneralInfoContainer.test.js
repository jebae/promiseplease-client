import React from "react";
import { shallow } from "enzyme";
import countUp from "../utils/countUpAnimation";
import axios from "axios";
import DumbFactory from "../../.test_utils/DumbComponent";
import GeneralInfoContainer from "./GeneralInfoContainer";

describe("GeneralInfoContainer", () => {
	let consoleError;
	const dumbFactory = DumbFactory({
		state: {
			avgAge: 0,
			minAge: 0,
			maxAge: 0,
			partyCount: 0,
			manRatio: 0,
			womanRatio: 0,
		},
		methods: {
			getAggregateAge: GeneralInfoContainer.prototype.getAggregateAge,
			getAvgAge: GeneralInfoContainer.prototype.getAvgAge,
			getMinAge: GeneralInfoContainer.prototype.getMinAge,
			getMaxAge: GeneralInfoContainer.prototype.getMaxAge,
			getPartyCount: GeneralInfoContainer.prototype.getPartyCount,
			getGenderRatio: GeneralInfoContainer.prototype.getGenderRatio,
		}
	});
	const baseRes = {
		status: 200,
		data: {}
	};
	const avgAgeRes = {
		...baseRes,
		data: { age: 63 }
	};
	const minAgeRes = {
		...baseRes,
		data: { age: 34 }
	};
	const maxAgeRes = {
		...baseRes,
		data: { age: 78 }
	};
	const partyCountRes = {
		...baseRes,
		data: { count: 23 }
	}
	const genderCountRes = {
		...baseRes,
		data: {
			count: { man: 210, woman: 34 }
		}
	}

	beforeEach(() => {
		consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
		countUp.mockImplementation(() => {});
		axios.get.mockImplementation((url, { params }) => {
			if (url.includes("/age")) {
				switch (params.aggregate) {
					case "avg":
						return Promise.resolve(avgAgeRes);
					case "min":
						return Promise.resolve(minAgeRes);
					case "max":
						return Promise.resolve(maxAgeRes);
				}
			} else if (url.includes("/party/count")) {
				return Promise.resolve(partyCountRes);
			} else if (url.includes("/candidate/count")) {
				return Promise.resolve(genderCountRes);
			}
		});
	});

	test("render", () => {
		const wrapper = shallow(
			<GeneralInfoContainer
				fetchCountUp={ jest.fn() }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
		expect(wrapper.state("avgAge")).toEqual(0);
		expect(wrapper.state("minAge")).toEqual(0);
		expect(wrapper.state("maxAge")).toEqual(0);
		expect(wrapper.state("partyCount")).toEqual(0);
		expect(wrapper.state("manRatio")).toEqual(0);
		expect(wrapper.state("womanRatio")).toEqual(0);
	});

	describe("Method", () => {
		let dumb;

		beforeEach(() => {
			dumb = new dumbFactory();
			dumb.props = { fetchCountUp: jest.fn() };
			dumb.props.fetchCountUp.bind(dumb);
		});

		test("getAvgAge (200)", () => {			
			return new Promise((resolve, reject) => {
				dumb.getAvgAge();
				setImmediate(resolve);
			})
			.then(() => {
				expect(dumb.state.avgAge).toEqual(avgAgeRes.data.age);
				expect(dumb.props.fetchCountUp).toHaveBeenCalledTimes(1);
			});
		});

		test("getAvgAge (500)", () => {
			axios.get.mockReturnValue(Promise.reject());
			
			return new Promise((resolve, reject) => {
				dumb.getAvgAge();
				setImmediate(resolve);
			})
			.then(() => {
				expect(consoleError).toHaveBeenCalledTimes(1);
				expect(dumb.props.fetchCountUp).toHaveBeenCalledTimes(1);
			});
		});

		test("getMinAge (200)", () => {			
			return new Promise((resolve, reject) => {
				dumb.getMinAge();
				setImmediate(resolve);
			})
			.then(() => {
				expect(dumb.state.minAge).toEqual(minAgeRes.data.age);
				expect(dumb.props.fetchCountUp).toHaveBeenCalledTimes(1);
			});
		});

		test("getMinAge (500)", () => {
			axios.get.mockReturnValue(Promise.reject());
			
			return new Promise((resolve, reject) => {
				dumb.getMinAge();
				setImmediate(resolve);
			})
			.then(() => {
				expect(consoleError).toHaveBeenCalledTimes(1);
				expect(dumb.props.fetchCountUp).toHaveBeenCalledTimes(1);
			});
		});

		test("getMaxAge (200)", () => {
			return new Promise((resolve, reject) => {
				dumb.getMaxAge();
				setImmediate(resolve);
			})
			.then(() => {
				expect(dumb.state.maxAge).toEqual(maxAgeRes.data.age);
				expect(dumb.props.fetchCountUp).toHaveBeenCalledTimes(1);
			});
		});

		test("getMaxAge (500)", () => {
			axios.get.mockReturnValue(Promise.reject());
			
			return new Promise((resolve, reject) => {
				dumb.getMaxAge();
				setImmediate(resolve);
			})
			.then(() => {
				expect(consoleError).toHaveBeenCalledTimes(1);
				expect(dumb.props.fetchCountUp).toHaveBeenCalledTimes(1);
			});		
		});

		test("getPartyCount (200)", () => {
			return new Promise((resolve, reject) => {
				dumb.getPartyCount();
				setImmediate(resolve);
			})
			.then(() => {
				expect(dumb.state.partyCount).toEqual(partyCountRes.data.count);
				expect(dumb.props.fetchCountUp).toHaveBeenCalledTimes(1);
			});
		});

		test("getPartyCount (500)", () => {
			axios.get.mockReturnValue(Promise.reject());
			
			return new Promise((resolve, reject) => {
				dumb.getPartyCount();
				setImmediate(resolve);
			})
			.then(() => {
				expect(consoleError).toHaveBeenCalledTimes(1);
				expect(dumb.props.fetchCountUp).toHaveBeenCalledTimes(1);
			});
		});

		test("getGenderRatio (200)", () => {
			return new Promise((resolve, reject) => {
				dumb.getGenderRatio();
				setImmediate(resolve);
			})
			.then(() => {
				const { man, woman } = genderCountRes.data.count;
				const expectedManRatio = parseInt(man / (man + woman) * 100);
				const expectedWomanRatio = 100 - expectedManRatio;

				expect(dumb.state.manRatio).toEqual(expectedManRatio);
				expect(dumb.state.womanRatio).toEqual(expectedWomanRatio);
				expect(dumb.props.fetchCountUp).toHaveBeenCalledTimes(1);
			});
		});

		test("getGenderRatio (500)", () => {
			axios.get.mockReturnValue(Promise.reject());
			
			return new Promise((resolve, reject) => {
				dumb.getGenderRatio();
				setImmediate(resolve);
			})
			.then(() => {
				expect(consoleError).toHaveBeenCalledTimes(1);
				expect(dumb.props.fetchCountUp).toHaveBeenCalledTimes(1);
			});
		});
	});
	
	afterEach(() => {
		consoleError.mockRestore();
		countUp.mockReset();
		axios.get.mockReset();
	});
});