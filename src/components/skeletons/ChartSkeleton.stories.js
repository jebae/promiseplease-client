import React from "react";
import { storiesOf } from "@storybook/react";
import ChartSkeleton from "./ChartSkeleton";

storiesOf("ChartSkeleton", module)
	.add("init", () => {
		return (
			<ChartSkeleton/>
		);
	})