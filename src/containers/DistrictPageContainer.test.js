import React from "react";
import { shallow } from "enzyme";
import { DistrictPageContainer } from "./DistrictPageContainer";
import DumbFactory from "../../.test_utils/DumbComponent";

describe("DistrictPageContainer", () => {
	const dumbFactory = DumbFactory({
		state: {
			genderCount: { man: 0, woman: 0 },
			avgAge: 0,
			fetchComplete: { voteLocation: false, candidates: false },
		},
		methods: {
			notifyCandidateGeneralInfo: DistrictPageContainer.prototype.notifyCandidateGeneralInfo
		}
	});

	test("render", () => {
		const wrapper = shallow(
			<DistrictPageContainer
				fetchCountUp={ jest.fn() }
				fetchInit={ jest.fn() }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
		expect(wrapper.state("genderCount")).toEqual({ man: 0, woman: 0 });
		expect(wrapper.state("avgAge")).toEqual(0);
	});

	describe("Props", () => {
		test("props.match != prevProps.match", () => {
			const fetchCountInit = jest.fn();
			const wrapper = shallow(
				<DistrictPageContainer
					fetchCountUp={ jest.fn() }
					fetchCountInit={ fetchCountInit }
					match={ { params: { city: "", constituency: "" } } }
				/>
			);
	
			wrapper.setProps({ match: { params: { city: "foo", constituency: "bar" }}});
			expect(fetchCountInit).toHaveBeenCalledTimes(1);
		});
	});

	describe("Method", () => {
		test("notifyCandidateGeneralInfo", () => {
			const dumb = new dumbFactory();
			const expectedGenderCount = { man: 15, woman: 20 };
			const expectedAvgAge = 57;

			dumb.notifyCandidateGeneralInfo({
				genderCount: expectedGenderCount,
				avgAge: expectedAvgAge
			});
			expect(dumb.state.genderCount).toEqual(expectedGenderCount);
			expect(dumb.state.avgAge).toEqual(expectedAvgAge);
		});
	});
});