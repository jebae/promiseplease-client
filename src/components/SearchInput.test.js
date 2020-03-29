import React from "react";
import { shallow } from "enzyme";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
	test("render", () => {
		const wrapper = shallow(
			<SearchInput
				text=""
				setText={ jest.fn() }
				handleFocus={ jest.fn() }
				handleBlur={ jest.fn() }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
	});

	describe("Event", () => {
		test("change", () => {
			const setText = jest.fn();
			const value = "foo";
			const wrapper = shallow(
				<SearchInput
					text=""
					setText={ setText }
					handleFocus={ jest.fn() }
					handleBlur={ jest.fn() }
				/>
			);
			
			wrapper.simulate("change", { target: { value } });
			expect(setText).toHaveBeenCalledTimes(1);
			expect(setText).toHaveBeenCalledWith(value);
		});

		test("focus", () => {
			const handleFocus = jest.fn();
			const wrapper = shallow(
				<SearchInput
					text=""
					setText={ jest.fn() }
					handleFocus={ handleFocus }
					handleBlur={ jest.fn() }
				/>
			);

			wrapper.simulate("focus");
			expect(handleFocus).toHaveBeenCalledTimes(1);
		});

		test("blur", () => {
			const handleBlur = jest.fn();
			const wrapper = shallow(
				<SearchInput
					text=""
					setText={ jest.fn() }
					handleFocus={ jest.fn() }
					handleBlur={ handleBlur }
				/>
			);

			wrapper.simulate("blur");
			expect(handleBlur).toHaveBeenCalledTimes(1);
		});
	});
});