import React from "react";
import { storiesOf } from "@storybook/react";
import Search from "./Search";
import AutoCompleteContainer from "../containers/AutoCompleteContainer";
import { MemoryRouter } from "react-router-dom";

const words = [
	{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "지역" },
	{ word: "홍록기", city: "대전", constituency: "서구을", type: "지역" },
	{ word: "홍삼", city: "무안", constituency: "일로", type: "후보" },
	{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "지역" },
	{ word: "홍록기", city: "대전", constituency: "서구을", type: "지역" },
	{ word: "홍삼", city: "무안", constituency: "일로", type: "후보" },
];
const setText = (text) => { console.log(text) };
const handleFocus = () => { console.log("focus") };
const handleBlur = () => { console.log("blur") };

storiesOf("Search", module)
	.add("AutoComplete visible", () => {
		AutoCompleteContainer.prototype.__constructor__ = function() {
			Object.assign(this.state, { words });
		}

		return (
			<MemoryRouter>
				<Search
					text=""
					showAutoComplete={ true }
					setText={ setText }
					handleFocus={ handleFocus }
					handleBlur={ handleBlur }
				/>
			</MemoryRouter>
		);
	})