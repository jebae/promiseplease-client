import React from "react";
import { storiesOf } from "@storybook/react";
import JumbotronSkeleton from "./JumbotronSkeleton";

storiesOf("JumbotronSkeleton", module)
	.add("init", () => {
		return (
			<JumbotronSkeleton/>
		);
	})