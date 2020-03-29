import React from "react";
import { storiesOf } from "@storybook/react";
import GeneralInfoSkeleton from "./GeneralInfoSkeleton";

storiesOf("GeneralInfoSkeleton", module)
	.add("init", () => {
		return (
			<GeneralInfoSkeleton/>
		);
	})