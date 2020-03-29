import React from "react";
import { mount } from "enzyme";
import countUp from "../../utils/countUpAnimation";
import DumbFactory from "../../../.test_utils/DumbComponent";
import withCountUpInnerText from "./withCountUpInnerText";

describe("withCountUpInnerText", () => {
	const keys = ["foo", "bar"];
	const HOC = withCountUpInnerText({})(null);
	const dumbFactory = DumbFactory({
		state: {
			propName: null,
			duration: 5000,
			counter: 0
		},
		methods : {
			changeDomText: HOC.prototype.changeDomText,
			checkCancel: HOC.prototype.checkCancel,
			handleChange: HOC.prototype.handleChange,
		}
	});

	const ExampleComponent = React.forwardRef((props, ref) => {
		return (
			<div ref={ ref }></div>
		);
	});

	beforeEach(() => {
		countUp.mockImplementation(() => {});
	});

	test("render", () => {
		const propName = "foo";
		const otherProp = "dada";
		const Wrapped = withCountUpInnerText({ propName, duration: 5000 })(ExampleComponent);
		const wrapper = mount(
			<Wrapped
				dada={ otherProp }
				foo={ 0 }
			/>
		);
		expect(wrapper.exists()).toEqual(true);
		const wrappedComponent = wrapper.find(ExampleComponent);

		expect(wrapper.state("propName")).toEqual(propName);
		expect(wrapper.instance().refToForward).not.toEqual(undefined);
		expect(wrappedComponent.exists()).toEqual(true);
		expect(wrappedComponent.props().dada).toEqual(otherProp);
		expect(wrappedComponent.props().foo).toEqual(0);
	});

	describe("Method", () => {
		test("changeDomText (current != null)", () => {
			const dumb = new dumbFactory();
			const changeText = 10;

			dumb.refToForward = { current: { innerText: null } }
			expect(dumb.changeDomText(changeText)).toEqual(true);
			expect(dumb.refToForward.current.innerText).toEqual(changeText);
		});

		test("changeDomText (current == null)", () => {
			const changeText = 10;
			const dumb = new dumbFactory();

			dumb.refToForward = { current: null }
			expect(dumb.changeDomText(changeText)).toEqual(false);
			expect(dumb.refToForward.current).toEqual(null);
		})

		test("checkCancel (cancel)", () => {
			const dumb = new dumbFactory();
			
			dumb.state.counter = 1;
			const checkCancelCallback = dumb.checkCancel();

			dumb.state.counter++;
			expect(checkCancelCallback()).toEqual(true);
		});

		test("checkCancel (no cancel)", () => {
			const dumb = new dumbFactory();
			
			dumb.state.counter = 1;
			const checkCancelCallback = dumb.checkCancel();

			expect(checkCancelCallback()).toEqual(false);
		});

		test("handleChange (this.props[propName] == 0)", () => {
			const dumb = new dumbFactory();
			const initCounter = 0;

			dumb.state.propName = "foo";
			dumb.state.counter = initCounter;
			dumb.props = {
				[dumb.state.propName]: 0
			}
			dumb.handleChange(null);

			expect(dumb.state.counter).toEqual(initCounter);
			expect(countUp).toHaveBeenCalledTimes(0);
		});

		test("handleChange (this.props[propName] != 0, prevProps == null)", () => {
			const dumb = new dumbFactory();
			const initCounter = 0;

			dumb.state.propName = "foo";
			dumb.state.counter = initCounter;
			dumb.props = {
				[dumb.state.propName]: 1
			}
			dumb.handleChange(null);

			expect(dumb.state.counter).toEqual(initCounter + 1);
			expect(countUp).toHaveBeenCalledTimes(1);
		});

		test("handleChange (this.props[propName] != 0, prevProps == this.props[propName])", () => {
			const dumb = new dumbFactory();
			const initCounter = 0;
			const value = 1;

			dumb.state.propName = "foo";
			dumb.state.counter = initCounter;
			dumb.props = {
				[dumb.state.propName]: value
			}
			dumb.handleChange({ [dumb.state.propName]: value });

			expect(dumb.state.counter).toEqual(initCounter);
			expect(countUp).toHaveBeenCalledTimes(0);
		});

		test("handleChange (this.props[propName] != 0, prevProps != this.props[propName])", () => {
			const dumb = new dumbFactory();
			const initCounter = 0;
			const value = 1;

			dumb.state.propName = "foo";
			dumb.state.counter = initCounter;
			dumb.props = {
				[dumb.state.propName]: value
			}
			dumb.handleChange({ [dumb.state.propName]: value + 1 });

			expect(dumb.state.counter).toEqual(initCounter + 1);
			expect(countUp).toHaveBeenCalledTimes(1);
		});
	});

	afterEach(() => {
		countUp.mockReset();
	});
});