import React from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";
import AutoCompleteList from "./AutoCompleteList";
import "../stylesheets/components/AutoCompleteList.scss";

const getNext = () => { console.log("bottom") };
const words = [
	{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "선거구" },
	{ word: "홍록기", city: "대전", constituency: "서구을", type: "선거구" },
	{ word: "홍삼", city: "전남", constituency: "무안", type: "후보" },
	{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "선거구" },
	{ word: "홍록기", city: "대전", constituency: "서구을", type: "선거구" },
	{ word: "홍삼", city: "전남", constituency: "무안", type: "후보" },
];

storiesOf("AutoCompleteList", module)
	.add("init", () => {
		return (
			<MemoryRouter>
				<AutoCompleteList
					words={ words }
					visible={ true }
					pending={ false }
					getNext={ getNext }
					setText={ () => {} }
				/>
			</MemoryRouter>
		);
	})
	.add("visible == false", () => {
		return (
			<MemoryRouter>
				<AutoCompleteList
					words={ words }
					visible={ false }
					pending={ false }
					getNext={ getNext }
					setText={ () => {} }
				/>
			</MemoryRouter>
		);
	})
	.add("pending == true", () => {
		const words = [
			{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "선거구" },
			{ word: "홍록기", city: "대전", constituency: "서구을", type: "선거구" },
			{ word: "홍삼", city: "전남", constituency: "무안", type: "후보" },
		];
		return (
			<MemoryRouter>
				<AutoCompleteList
					words={ words }
					visible={ true }
					pending={ true }
					getNext={ getNext }
					setText={ () => {} }
				/>
			</MemoryRouter>
		);
	})