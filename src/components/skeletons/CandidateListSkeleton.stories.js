import React from "react";
import { storiesOf } from "@storybook/react";
import CandidateListSkeleton from "./CandidateListSkeleton";

storiesOf("CandidateListSkeleton", module)
	.add("init", () => {
		return (
			<CandidateListSkeleton/>
		);
	})