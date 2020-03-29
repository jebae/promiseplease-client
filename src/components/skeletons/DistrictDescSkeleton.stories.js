import React from "react";
import { storiesOf } from "@storybook/react";
import DistrictDescSkeleton from "./DistrictDescSkeleton";

storiesOf("DistrictDescSkeleton", module)
	.add("init", () => {
		return (
			<DistrictDescSkeleton/>
		);
	})