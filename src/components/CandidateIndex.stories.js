import React from "react";
import { storiesOf } from "@storybook/react";
import CandidateIndex from "./CandidateIndex";

const props = {
	number: 1,
	name: "류현진",
	party: "닫힌우리당",
	color: { start: "#98FB98", end: "#006400" }
}

storiesOf("CandidateIndex", module)
	.add("init", () => {
		return (
			<CandidateIndex
				number={ props.number }
				name={ props.name }
				party={ props.party }
				color={ props.color }
				scrollToView={ () => { console.log("scrollToView") } }
			/>
		);
	})