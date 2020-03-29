import React from "react";
import { storiesOf } from "@storybook/react";
import DistrictPageSkeleton from "./DistrictPageSkeleton";

storiesOf("DistrictPageSkeleton", module)
	.add("init", () => {
		return (
			<DistrictPageSkeleton/>
		);
	})