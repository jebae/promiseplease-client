import React from "react";
import { storiesOf } from "@storybook/react";
import VoteLocation from "./VoteLocation";

storiesOf("VoteLocation", module)
	.add("init", () => {
		return (
			<VoteLocation
				districts={ [] }
				locations={ [] }
				currentDistrict={ -1 }
				getVoteLocations={ () => {} }
				changeDistrict={ () => {} }
			/>
		);
	})