import React from "react";
import axios from "axios";
import { storiesOf } from "@storybook/react";
import AutoCompleteContainer from "./AutoCompleteContainer";
import { MemoryRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";

const words = [
	{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "선거구" },
	{ word: "홍록기", city: "대전", constituency: "서구을", type: "선거구" },
	{ word: "홍삼", city: "전남", constituency: "무안", type: "후보" },
	{ word: "홍길동", city: "서울", constituency: "종로구갑", type: "선거구" },
	{ word: "홍록기", city: "대전", constituency: "서구을", type: "선거구" },
	{ word: "홍삼", city: "전남", constituency: "무안", type: "후보" },
];
const SERVICE_API = process.env.SERVICE_API;

storiesOf("AutoCompleteContainer", module)
	.add("next is null", () => {
		AutoCompleteContainer.prototype.__constructor__ = function () {
			Object.assign(this.state, { words });
		}

		return (
			<MemoryRouter>
				<AutoCompleteContainer
					text="홍"
					visible={ true }
					setText={ () => {} }
				/>
			</MemoryRouter>
		);
	})
	.add("next != null", () => {
		AutoCompleteContainer.prototype.__constructor__ = function () {
			Object.assign(this.state, { words, next: 1 });
		}

		const axiosMock = new MockAdapter(axios, { delayResponse: 1500 });

		axiosMock
			.onGet(`${SERVICE_API}/word`)
			.reply(200, { words, next: 1 });

		return (
			<MemoryRouter>
				<AutoCompleteContainer
					text="홍"
					visible={ true }
					setText={ () => {} }
				/>
			</MemoryRouter>
		);
	})
	.add("next !null -> null", () => {
		AutoCompleteContainer.prototype.__constructor__ = function () {
			Object.assign(this.state, { words, next: 1 });
		}
	
		const axiosMock = new MockAdapter(axios, { delayResponse: 1500 });

		axiosMock
			.onGet(`${SERVICE_API}/word`)
			.replyOnce(200, { words, next: null })

		return (
			<MemoryRouter>
				<AutoCompleteContainer
					text="홍"
					visible={ true }
					setText={ () => {} }
				/>
			</MemoryRouter>
		);
	})