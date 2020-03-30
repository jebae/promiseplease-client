import React from "react";
import { shallow } from "enzyme";
import Head from "./Head";

describe("Head", () => {
	const title = "약속해줘 - 당신의 공약을 보여주세요";
	const description = "21대 국회의원 선거 투표소와 후보들의 공약을 찾아보세요";
	const keywords = [ "총선", "21대 총선", "투표", "국회의원 선거", "선거", "투표소", "공약", ];
	const image = "https://www.dropbox.com/s/vbq4p10qaw4fz0e/vote.jpg?raw=1";

	test("render", () => {
		const wrapper = shallow(
			<Head
				url="http://example.com"
				title={ title }
				description={ description }
				keywords={ keywords }
				image={ image }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
	});
});