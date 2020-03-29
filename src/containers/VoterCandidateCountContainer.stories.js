import React from "react";
import axios from "axios";
import { storiesOf } from "@storybook/react";
import VoterCandidateCountContainer from "./VoterCandidateCountContainer";
import MockAdapter from "axios-mock-adapter";

const SERVICE_API = process.env.SERVICE_API;

storiesOf("VoterCandidateCountContainer", module)
	.add("init", () => {
		const voterCount = 38760000;
		const candidateCount = 689;
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.onGet(`${SERVICE_API}/voter/count`).reply(200, { count: voterCount })
			.onGet(`${SERVICE_API}/candidate/count`).reply(200, { count: candidateCount })
		return (
			<VoterCandidateCountContainer/>
		);
	})
	.add("0 count", () => {
		const axiosMock = new MockAdapter(axios, { delayResponse: 1000 });

		axiosMock.onGet(`${SERVICE_API}/voter/count`).reply(200, { count: 0 })
			.onGet(`${SERVICE_API}/candidate/count`).reply(200, { count: 0 })
		return (
			<VoterCandidateCountContainer/>
		);
	})


