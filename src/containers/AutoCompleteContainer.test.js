import React from "react";
import { shallow } from "enzyme";
import axios from "axios";
import DumbFactory from "../../.test_utils/DumbComponent";
import AutoCompleteContainer from "./AutoCompleteContainer";

describe("AutoCompleteContainer", () => {
	let consoleError;

	beforeEach(() => {
		consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
	});
	
	const res = {
		status: 200,
		data: {
			words: [
				{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "지역" },
				{ word: "홍록기", city: "대전", constituency: "서구을", type: "지역" },
				{ word: "홍삼", city: "무안", constituency: "일로", type: "후보" },
			],
			next: 8
		}
	};

	const dumbFactory = DumbFactory({
		state: {
			words: [],
			text: "",
			next: null,
			pending: false
		},
		methods: {
			extractValidText: AutoCompleteContainer.prototype.extractValidText,
			getWords: AutoCompleteContainer.prototype.getWords,
			getNext: AutoCompleteContainer.prototype.getNext,
			getNewWords: AutoCompleteContainer.prototype.getNewWords,
		}
	});

	test("render", () => {
		const wrapper = shallow(
			<AutoCompleteContainer
				text=""
				visible={ true }
				setText={ jest.fn() }
			/>
		);

		expect(wrapper.exists()).toEqual(true);
		expect(wrapper.state("words")).toHaveLength(0);
		expect(wrapper.state("text")).toEqual("");
		expect(wrapper.state("pending")).toEqual(false);
		expect(wrapper.state("next")).toEqual(null);
	});

	describe("Method", () => {
		test("extractValidText", () => {
			const dumb = new dumbFactory();
			
			expect(dumb.extractValidText("가ㄴ")).toEqual("가");
			expect(dumb.extractValidText("ㄴ가")).toEqual("가");
			expect(dumb.extractValidText("ㄴ가ㅡ미")).toEqual("가미");
			expect(dumb.extractValidText("ㄴㅜㅋ")).toEqual("");
			expect(dumb.extractValidText("ㅋ")).toEqual("");
			expect(dumb.extractValidText("ㅋ가나")).toEqual("가나");
			expect(dumb.extractValidText("ㅋ가나ㅉ")).toEqual("가나");
		});
		
		test("getWords (200)", () => {
			const dumb = new dumbFactory();
			const callback = jest.fn();
			axios.get.mockReturnValue(Promise.resolve(res));

			dumb.state.text = "가";
			return new Promise(resolve => {
				dumb.getWords(null, callback);
				expect(dumb.state.pending).toEqual(true);
				setImmediate(resolve);
			})
			.then(() => {
				expect(dumb.state.pending).toEqual(false);
				expect(callback).toHaveBeenCalledTimes(1);
			})
		});

		test("getWords (500)", () => {
			const dumb = new dumbFactory();
			const callback = jest.fn();
			axios.get.mockReturnValue(Promise.resolve({ status: 500 }));

			dumb.state.text = "가";
			return new Promise(resolve => {
				dumb.getWords(null, callback);
				expect(dumb.state.pending).toEqual(true);
				setImmediate(resolve);
			})
			.then(() => {
				expect(dumb.state.pending).toEqual(false);
				expect(callback).not.toHaveBeenCalled();
			})
		});

		test("getNext (state.next != null)", () => {
			const dumb = new dumbFactory();
			axios.get.mockReturnValue(Promise.resolve(res));

			dumb.state.text = "가";
			dumb.state.next = 2;
			dumb.state.words = [{}, {}];
			const beforeLength = dumb.state.words.length;
			return new Promise(resolve => {
				dumb.getNext();
				expect(dumb.state.pending).toEqual(true);
				setImmediate(resolve);
			})
			.then(() => {
				expect(dumb.state.words).toHaveLength(res.data.words.length + beforeLength);
				expect(dumb.state.next).toEqual(res.data.next);
				expect(dumb.state.pending).toEqual(false);
			});
		});

		test("getNext (state.next == null)", () => {
			const dumb = new dumbFactory();
			axios.get.mockReturnValue(Promise.resolve(res));

			dumb.state.text = "가";
			dumb.state.next = null;
			dumb.state.words = [{}, {}];
			const beforeLength = dumb.state.words.length;

			dumb.getNext();
			expect(dumb.state.words).toHaveLength(beforeLength);
			expect(dumb.state.next).toEqual(null);
			expect(dumb.state.pending).toEqual(false);
		});

		test("getNewWords", () => {
			const dumb = new dumbFactory();
			axios.get.mockReturnValue(Promise.resolve(res));

			dumb.state.text = "가";
			dumb.state.words = [{}, {}];
			const beforeLength = dumb.state.words.length;
			return new Promise(resolve => {
				dumb.getNewWords();
				expect(dumb.state.pending).toEqual(true);
				setImmediate(resolve);
			})
			.then(() => {
				expect(dumb.state.words).toHaveLength(res.data.words.length);
				expect(dumb.state.next).toEqual(res.data.next);
				expect(dumb.state.pending).toEqual(false);
			});		
		});
	});

	describe("Props", () => {
		test("props.text == prevProps.text", () => {
			const text = "홍";
			const wrapper = shallow(
				<AutoCompleteContainer
					text={ text }
					visible={ true }
					setText={ jest.fn() }
				/>
			);
			jest.spyOn(wrapper.instance(), "setState");
	
			wrapper.setProps({ text });
			expect(wrapper.instance().setState).not.toHaveBeenCalled();
		});

		test("props.text != prevProps.text (prevProps.text == '')", () => {
			const wrapper = shallow(
				<AutoCompleteContainer
					text=""
					visible={ true }
					setText={ jest.fn() }
				/>
			);
			jest.spyOn(wrapper.instance(), "getNewWords");
			axios.get.mockReturnValue(Promise.resolve(res));

			return new Promise((resolve, reject) => {
				wrapper.setProps({ text: "홍" });
				setImmediate(resolve);
			})
			.then(() => {
				expect(wrapper.instance().getNewWords).toHaveBeenCalledTimes(1);
			})
		});

		test("props.text != prevProps.text (props.text == '')", () => {
			const wrapper = shallow(
				<AutoCompleteContainer
					text="서"
					visible={ true }
					setText={ jest.fn() }
				/>
			);
			wrapper.setState({ words: [{}, {}, {}], next: 3 });

			wrapper.setProps({ text: "" });
			expect(wrapper.state("words")).toHaveLength(0);
			expect(wrapper.state("next")).toEqual(null);
		});

		test("props.text != prevProps.text", () => {
			const wrapper = shallow(
				<AutoCompleteContainer
					text="서"
					visible={ true }
					setText={ jest.fn() }
				/>
			);
			wrapper.setState({ words: [ {} ], next: 1 });
			jest.spyOn(wrapper.instance(), "getNewWords");
			axios.get.mockReturnValue(Promise.resolve(res));
	
			return new Promise((resolve, reject) => {
				wrapper.setProps({ text: "홍" });
				setImmediate(resolve);
			})
			.then(() => {
				expect(wrapper.instance().getNewWords).toHaveBeenCalledTimes(1);
			})
		});

		test("props.text != prevProps.text (change before api response)", () => {
			const wrapper = shallow(
				<AutoCompleteContainer
					text=""
					visible={ true }
					setText={ jest.fn() }
				/>
			);
			wrapper.setState({ words: [ {} ], next: 1 });
			jest.spyOn(wrapper.instance(), "getNewWords");
			axios.get.mockImplementation(() => new Promise((resolve, reject) => {
				setTimeout(() => { resolve(res) }, 2000);
			}));
	
			return new Promise((resolve, reject) => {
				wrapper.setProps({ text: "홍" });
				setImmediate(resolve);
			})
			.then(() => {
				wrapper.setProps({ text: "" });
				jest.advanceTimersByTime(2000);
			})
			.then(() => {
				expect(wrapper.state("words")).toHaveLength(0);
				expect(wrapper.state("next")).toEqual(null);
			})
		});
	});

	afterEach(() => {
		consoleError.mockRestore();
		axios.get.mockReset();
	});
});