import React from "react";
import { storiesOf } from "@storybook/react";
import GeneralInfo from "./GeneralInfo";

storiesOf("GeneralInfo", module)
	.add("init", () => {
		return (
			<GeneralInfo
				avgAge={ 63 }
				minAge={ 39 }
				maxAge={ 75 }
				partyCount={ 21 }
				manRatio={ 86 }
				womanRatio={ 14 }
			/>
		);
	})