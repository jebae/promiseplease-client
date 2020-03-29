import React from "react";
import { storiesOf } from "@storybook/react";
import DDay from "./DDay";

storiesOf("DDay", module)
	.add("init", () => {
		return <DDay/>;
	});