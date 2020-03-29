import React from "react";
import { shallow } from "enzyme";
import DumbFactory from "../../../.test_utils/DumbComponent";
import withSkeleton from "./withSkeleton";

describe("withSkeleton", () => {
	const dumbFactory = DumbFactory({
		state: {
			count: 0
		},
		methods: {
			countUp: withSkeleton({ Skeleton: null, fetchCount: 2 })(null).prototype.countUp,
			countInit: withSkeleton({ Skeleton: null, fetchCount: 2 })(null).prototype.countInit,
		}
	})
	const ExampleComponent = function (props) {
		return <div></div>;
	}
	const Skeleton = function () {
		return <div></div>;
	}

	test("render", () => {
		const WithSkeleton =
			withSkeleton({ Skeleton, fetchCount: 2 })(ExampleComponent);
		const wrapper = shallow(
			<WithSkeleton/>
		);

		expect(wrapper.find(".hidden").exists()).toEqual(true);
		expect(wrapper.find(ExampleComponent).exists()).toEqual(true);
		expect(wrapper.find(Skeleton).exists()).toEqual(true);
	});

	test("render (count >= fetchCount)", () => {
		const fetchCount = 2;
		const WithSkeleton =
			withSkeleton({ Skeleton, fetchCount })(ExampleComponent);
		const wrapper = shallow(
			<WithSkeleton/>
		);

		wrapper.setState({ count: fetchCount });
		expect(wrapper.find(".hidden").exists()).toEqual(false);
		expect(wrapper.find(ExampleComponent).exists()).toEqual(true);
		expect(wrapper.find(Skeleton).exists()).toEqual(false);
	});

	describe("Method", () => {
		test("countUp", () => {
			const dumb = new dumbFactory();
			const prevCount = dumb.state.count;
	
			dumb.countUp();
			expect(dumb.state.count).toEqual(prevCount + 1);
		});

		test("countInit", () => {
			const dumb = new dumbFactory();
	
			dumb.countUp();
			dumb.countInit();
			expect(dumb.state.count).toEqual(0);
		});
	});
});