import React from "react";
import { storiesOf } from "@storybook/react";
import VoterCandidateCount from "./VoterCandidateCount";

storiesOf("VoterCandidateCount", module)
	.add("init", () => {
		return (
			<VoterCandidateCount
				voterCount={ 3529 }
				candidateCount={ 490 }
			/>
		);
	})