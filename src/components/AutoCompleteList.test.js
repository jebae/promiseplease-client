import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import AutoCompleteList from "./AutoCompleteList";

describe("AutoCompleteList", () => {
	const words = [
		{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "지역" },
		{ word: "홍록기", city: "대전", constituency: "서구을", type: "지역" },
		{ word: "홍삼", city: "무안", constituency: "일로", type: "후보" },
	];

	test("render", () => {
		const wrapper = shallow(
			<AutoCompleteList.WrappedComponent
				words={ words }
				visible={ true }
				pending={ false }
				getNext={ jest.fn() }
				setText={ jest.fn() }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
		expect(wrapper.find("li")).toHaveLength(words.length + 1);
	});

	describe("Props", () => {
		test("visible == true", () => {
			const wrapper = shallow(
				<AutoCompleteList.WrappedComponent
					words={ words }
					visible={ true }
					pending={ false }
					getNext={ jest.fn() }
					setText={ jest.fn() }
				/>
			);

			expect(wrapper.find(".AutoComplete-Wrapper").hasClass("hidden")).toEqual(false);
		});

		test("visible == false", () => {
			const wrapper = shallow(
				<AutoCompleteList.WrappedComponent
					words={ words }
					visible={ false }
					pending={ false }
					getNext={ jest.fn() }
					setText={ jest.fn() }
				/>
			);

			expect(wrapper.find(".AutoComplete-Wrapper").hasClass("hidden")).toEqual(true);
		});

		test("words.length == 0", () => {
			const wrapper = shallow(
				<AutoCompleteList.WrappedComponent
					words={ [] }
					visible={ true }
					pending={ false }
					getNext={ jest.fn() }
					setText={ jest.fn() }
				/>
			);

			expect(wrapper.find(".AutoComplete-Wrapper").hasClass("hidden")).toEqual(true);
		});

		test("pending == true", () => {
			const wrapper = shallow(
				<AutoCompleteList.WrappedComponent
					words={ words }
					visible={ true }
					pending={ true }
					getNext={ jest.fn() }
					setText={ jest.fn() }
				/>
			);

			expect(wrapper.find(".AutoComplete-Loader").hasClass("hidden")).toEqual(false);
		});

		test("pending == false", () => {
			const wrapper = shallow(
				<AutoCompleteList.WrappedComponent
					words={ words }
					visible={ true }
					pending={ false }
					getNext={ jest.fn() }
					setText={ jest.fn() }
				/>
			);

			expect(wrapper.find(".AutoComplete-Loader").hasClass("hidden")).toEqual(true);
		});
	});

	describe("event", () => {
		test("scroll", () => {
			const getNext = jest.fn();
			const wrapper = shallow(
				<AutoCompleteList.WrappedComponent
					words={ words }
					visible={ true }
					pending={ false }
					getNext={ getNext }
					setText={ jest.fn() }
				/>
			);
			
			wrapper.simulate("scroll", { target: {
				scrollHeight: 500,
				scrollTop: 200,
				clientHeight: 300
			} });
			expect(getNext).toHaveBeenCalledTimes(1);
		});

		test("scroll (pending == true)", () => {
			const getNext = jest.fn();
			const wrapper = shallow(
				<AutoCompleteList.WrappedComponent
					words={ words }
					visible={ true }
					pending={ true }
					setText={ jest.fn() }
					getNext={ getNext }
				/>
			);
			
			wrapper.simulate("scroll", { target: {
				scrollHeight: 500,
				scrollTop: 200,
				clientHeight: 300
			} });
			expect(getNext).not.toHaveBeenCalled();
		});

		test("click li", () => {
			const setText = jest.fn();
			const wrapper = mount(
				<MemoryRouter>
					<AutoCompleteList.WrappedComponent
						words={ words }
						visible={ true }
						pending={ true }
						getNext={ jest.fn() }
						setText={ setText }
						history={ [] }
					/>
				</MemoryRouter>
			);
			
			wrapper.find("li").at(0).simulate("mouseDown");
			expect(wrapper.find(AutoCompleteList.WrappedComponent).props().history).toHaveLength(1);
			expect(setText).toHaveBeenCalledTimes(1);
			expect(setText).toHaveBeenCalledWith("");
		});
	});
});