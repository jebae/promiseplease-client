import React from "react";
import { shallow } from "enzyme";
import Search from "./Search";

describe("Search", () => {
	test("render", () => {
		const wrapper = shallow(
			<Search
				text=""
				showAutoComplete={ false }
				setText={ () => {} }
				handleFocus={ () => {} }
				handleBlur={ () => {} }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
	})
})