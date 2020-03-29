import React from "react";
import { storiesOf } from "@storybook/react";
import VoteLocationSkeleton from "./VoteLocationSkeleton";

storiesOf("VoteLocationSkeleton", module)
	.add("init", () => {
		return (
			<VoteLocationSkeleton/>
		);
	})