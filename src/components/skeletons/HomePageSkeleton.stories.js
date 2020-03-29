import React from "react";
import { storiesOf } from "@storybook/react";
import HomePageSkeleton from "./HomePageSkeleton";

storiesOf("HomePageSkeleton", module)
	.add("init", () => {
		return (
			<HomePageSkeleton/>
		);
	})