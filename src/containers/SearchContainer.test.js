import React from "react";
import { shallow, mount } from "enzyme";
import SearchContainer from "./SearchContainer";
import AutoCompleteContainer from "./AutoCompleteContainer";
import SearchInput from "../components/SearchInput";
import { MemoryRouter, Link } from "react-router-dom";
import axios from "axios";
import DumbFactory from "../../.test_utils/DumbComponent";
import AutoCompleteListContainer from "./AutoCompleteContainer";

describe("SearchContainer", () => {
	const dumbFactory = DumbFactory({
		state: {
			text: "",
			showAutoComplete: false
		},
		methods: {
			setText: SearchContainer.prototype.setText,
			handleFocus: SearchContainer.prototype.handleFocus,
			handleBlur: SearchContainer.prototype.handleBlur,
		}
	});
	const res = {
		status: 200,
		data: {
			words: [
				{ word: "홍길동", city: "서울", district: "종로구갑" },
				{ word: "홍록기", city: "대전", district: "서구을" },
				{ word: "홍삼", city: "무안", district: "일로" },
			],
			next: 3
		}
	};

	test("render", () => {
		const wrapper = shallow(<SearchContainer/>);

		expect(wrapper.exists()).toEqual(true);
		expect(wrapper.state("text")).toEqual("");
		expect(wrapper.state("showAutoComplete")).toEqual(false);
	});

	describe("Method", () => {
		test("setText", () => {
			const dumb = new dumbFactory();
			const expectedText = "foo";

			dumb.setText(expectedText);
			expect(dumb.state.text).toEqual(expectedText);
		});

		test("handleFocus", () => {
			const dumb = new dumbFactory();

			dumb.state.showAutoComplete = false;
			dumb.handleFocus();
			expect(dumb.state.showAutoComplete).toEqual(true);
		});

		test("handleBlur", () => {
			const dumb = new dumbFactory();

			dumb.state.showAutoComplete = true;
			dumb.handleBlur();
			expect(dumb.state.showAutoComplete).toEqual(false);
		});
	});

	describe("event", () => {
		let wrapper;
		let autoCompleteContainer;

		beforeEach(() => {
			wrapper = mount(
				<MemoryRouter>
					<SearchContainer/>
				</MemoryRouter>
			);
			autoCompleteContainer = wrapper.find(AutoCompleteContainer);
			jest.spyOn(autoCompleteContainer.instance(), "getNewWords");
			axios.get.mockReturnValue(Promise.resolve(res));
		});

		test("focus", () => {
			wrapper.find(SearchInput).simulate("focus");
			expect(wrapper.find(AutoCompleteListContainer).props().visible).toEqual(true);
		});

		test("blur", () => {
			wrapper.find(SearchInput).simulate("focus");
			wrapper.find(SearchInput).simulate("blur");
			expect(wrapper.find(AutoCompleteListContainer).props().visible).toEqual(false);
		});

		test("change ('' -> valid)", () => {
			const value = "서";

			return new Promise((resolve, reject) => {
				wrapper.find(SearchInput).simulate("change", { target: { value } });
				setImmediate(resolve);
			}).then(() => {
				expect(wrapper.find(SearchContainer).state("text")).toEqual(value);
				expect(autoCompleteContainer.state("text")).toEqual(value);
				expect(autoCompleteContainer.state("words")).toEqual(res.data.words);
				expect(autoCompleteContainer.state("next")).toEqual(res.data.next);
			});
		});

		test("change ('' -> invalid)", () => {
			const value = "ㄴㄴ";

			jest.spyOn(autoCompleteContainer.instance(), "setState");
			wrapper.find(SearchInput).simulate("change", { target: { value } });
			expect(wrapper.find(SearchContainer).state("text")).toEqual(value);
			expect(autoCompleteContainer.instance().setState).not.toHaveBeenCalled();
		});

		test("change ('' -> partially valid)", () => {
			const value = "ㄴ서ㄱ";

			return new Promise((resolve, reject) => {
				wrapper.find(SearchInput).simulate("change", { target: { value } });
				setImmediate(resolve);
			}).then(() => {
				expect(wrapper.find(SearchContainer).state("text")).toEqual(value);
				expect(autoCompleteContainer.state("text")).toEqual("서");
				expect(autoCompleteContainer.state("words")).toEqual(res.data.words);
				expect(autoCompleteContainer.state("next")).toEqual(res.data.next);
			});
		});

		test("change (valid -> '')", () => {
			return new Promise((resolve, reject) => {
				wrapper.find(SearchInput).simulate("change", { target: { value: "서" } });
				setImmediate(resolve);
			})
			.then(() => {
				wrapper.find(SearchInput).simulate("change", { target: { value: "" } });
			})
			.then(() => {
				expect(wrapper.find(SearchContainer).state("text")).toEqual("");
				expect(autoCompleteContainer.state("text")).toEqual("");
				expect(autoCompleteContainer.state("words")).toHaveLength(0);
				expect(autoCompleteContainer.state("next")).toEqual(null);	
			});
		});

		test("change (valid -> valid)", () => {
			const prevValue = "서";
			const nextValue = "동";

			return new Promise((resolve, reject) => {
				wrapper.find(SearchInput).simulate("change", { target: { value: prevValue } });
				setImmediate(resolve);
			})
			.then(() => {
				wrapper.find(SearchInput).simulate("change", { target: { value: nextValue } });
			})
			.then(() => { wrapper.update(); })
			.then(() => {
				expect(wrapper.find(SearchContainer).state("text")).toEqual(nextValue);
				expect(autoCompleteContainer.state("text")).toEqual(nextValue);
				expect(autoCompleteContainer.instance().getNewWords).toHaveBeenCalledTimes(2);
			});
		});

		test("change (valid -> invalid)", () => {
			const prevValue = "서";
			const nextValue = "ㄴㄷㄴ";

			return new Promise((resolve, reject) => {
				wrapper.find(SearchInput).simulate("change", { target: { value: prevValue } });
				setImmediate(resolve);
			})
			.then(() => {
				wrapper.find(SearchInput).simulate("change", { target: { value: nextValue } });
			})
			.then(() => { wrapper.update(); })
			.then(() => {
				expect(wrapper.find(SearchContainer).state("text")).toEqual(nextValue);
				expect(autoCompleteContainer.state("text")).toEqual("");
				expect(autoCompleteContainer.instance().getNewWords).toHaveBeenCalledTimes(1);
			});
		});

		test("change (valid -> partially valid)", () => {
			const prevValue = "서";
			const nextValue = "서ㄴ";

			return new Promise((resolve, reject) => {
				wrapper.find(SearchInput).simulate("change", { target: { value: prevValue } });
				setImmediate(resolve);
			})
			.then(() => {
				wrapper.find(SearchInput).simulate("change", { target: { value: nextValue } });
			})
			.then(() => { wrapper.update(); })
			.then(() => {
				expect(wrapper.find(SearchContainer).state("text")).toEqual(nextValue);
				expect(autoCompleteContainer.state("text")).toEqual(prevValue);
				expect(autoCompleteContainer.instance().getNewWords).toHaveBeenCalledTimes(1);
			});
		});

		test("change (invalid -> valid)", () => {
			const prevValue = "ㄴ";
			const nextValue = "너";

			wrapper.find(SearchInput).simulate("change", { target: { value: prevValue } });
			return new Promise((resolve, reject) => {
				wrapper.find(SearchInput).simulate("change", { target: { value: nextValue } });
				setImmediate(resolve);
			})
			.then(() => {
				expect(wrapper.find(SearchContainer).state("text")).toEqual(nextValue);
				expect(autoCompleteContainer.state("text")).toEqual(nextValue);
				expect(autoCompleteContainer.instance().getNewWords).toHaveBeenCalledTimes(1);
			});
		});

		test("change (invalid -> '')", () => {
			const prevValue = "ㄴ";
			const nextValue = "";
			const autoCompleteContainer = wrapper.find(AutoCompleteContainer);
			jest.spyOn(autoCompleteContainer.instance(), "getNewWords");

			wrapper.find(SearchInput).simulate("change", { target: { value: prevValue } });
			wrapper.find(SearchInput).simulate("change", { target: { value: nextValue } });
			expect(wrapper.find(SearchContainer).state("text")).toEqual(nextValue);
			expect(autoCompleteContainer.state("text")).toEqual(nextValue);
			expect(autoCompleteContainer.instance().getNewWords).toHaveBeenCalledTimes(0);
		});

		test("change (invalid -> partially valid)", () => {
			const prevValue = "ㄴ";
			const nextValue = "ㄴ선ㄷ";

			wrapper.find(SearchInput).simulate("change", { target: { value: prevValue } });
			return new Promise((resolve, reject) => {
				wrapper.find(SearchInput).simulate("change", { target: { value: nextValue } });
				setImmediate(resolve);
			})
			.then(() => {
				expect(wrapper.find(SearchContainer).state("text")).toEqual(nextValue);
				expect(autoCompleteContainer.state("text")).toEqual("선");
				expect(autoCompleteContainer.instance().getNewWords).toHaveBeenCalledTimes(1);
			});
		});

		test("change (patially valid -> valid)", () => {
			const prevValue = "서ㄴ";
			const nextValue = "서노";

			return new Promise((resolve, reject) => {
				wrapper.find(SearchInput).simulate("change", { target: { value: prevValue } });
				setImmediate(resolve);
			})
			.then(() => {
				wrapper.find(SearchInput).simulate("change", { target: { value: nextValue } });
			})
			.then(() => { wrapper.update() })
			.then(() => {
				expect(wrapper.find(SearchContainer).state("text")).toEqual(nextValue);
				expect(autoCompleteContainer.state("text")).toEqual(nextValue);
				expect(autoCompleteContainer.instance().getNewWords).toHaveBeenCalledTimes(2);
			});
		});

		test("change (patially valid -> '')", () => {
			const prevValue = "서ㄴ";
			const nextValue = "";

			return new Promise((resolve, reject) => {
				wrapper.find(SearchInput).simulate("change", { target: { value: prevValue } });
				setImmediate(resolve);
			})
			.then(() => {
				wrapper.find(SearchInput).simulate("change", { target: { value: nextValue } });
				expect(wrapper.find(SearchContainer).state("text")).toEqual(nextValue);
				expect(autoCompleteContainer.state("text")).toEqual(nextValue);
				expect(autoCompleteContainer.instance().getNewWords).toHaveBeenCalledTimes(1);
			})
		});

		test("change (patially valid -> invalid)", () => {
			const prevValue = "서ㄴ";
			const nextValue = "ㄴ!ㅍ";

			return new Promise((resolve, reject) => {
				wrapper.find(SearchInput).simulate("change", { target: { value: prevValue } });
				setImmediate(resolve);
			})
			.then(() => {
				wrapper.find(SearchInput).simulate("change", { target: { value: nextValue } });
				expect(wrapper.find(SearchContainer).state("text")).toEqual(nextValue);
				expect(autoCompleteContainer.state("text")).toEqual("");
				expect(autoCompleteContainer.instance().getNewWords).toHaveBeenCalledTimes(1);
			})
		});

		test("change (patially valid -> patially valid)", () => {
			const prevValue = "서ㄴ";
			const nextValue = "서노ㅍ";

			return new Promise((resolve, reject) => {
				wrapper.find(SearchInput).simulate("change", { target: { value: prevValue } });
				setImmediate(resolve);
			})
			.then(() => {
				wrapper.find(SearchInput).simulate("change", { target: { value: nextValue } });
			})
			.then(() => { wrapper.update() })
			.then(() => {
				expect(wrapper.find(SearchContainer).state("text")).toEqual(nextValue);
				expect(autoCompleteContainer.state("text")).toEqual("서노");
				expect(autoCompleteContainer.instance().getNewWords).toHaveBeenCalledTimes(2);
			});
		});

		test("click autocomplete > li", () => {
			return new Promise((resolve, reject) => {
				wrapper.find(SearchInput).simulate("change", { target: { value: "노" } });
				setImmediate(resolve);
			})
			.then(() => { wrapper.update() })
			.then(() => {
				wrapper.find("li").at(0).simulate("mouseDown");
			})
			.then(() => {
				expect(wrapper.find(SearchContainer).state("text")).toEqual("");
				expect(autoCompleteContainer.state("words")).toHaveLength(0);
			})
		});
	});
});