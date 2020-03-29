import React from "react";
import { storiesOf } from "@storybook/react";
import CategoryCountByCityChart from "./CategoryCountByCityChart";

const data = [
	{ city: "서울", "경제": 230, "의료": 100, "환경": 30, "교통": 20, "아동 및 육아": 19, "치안": 4, },
	{ city: "대전", "경제": 120, "의료": 103, "환경": 21, "교통": 40, "교육": 3, },
	{ city: "세종", "경제": 60, "의료": 32, "환경": 67, "아동 및 육아": 19, "치안": 43, },
	{ city: "제주", "의료": 34, "환경": 10, "치안": 21, },
	{ city: "전남", "경제": 110, "환경": 21, "교통": 78, "아동 및 육아": 17, "치안": 3, },
	{ city: "충북", "경제": 64, "환경": 12, "교통": 38, },
];
const keys = [ "경제", "의료", "환경", "교통", "교육", "아동 및 육아", "치안" ];

storiesOf("CategoryCountByCityChart", module)
	.add("init", () => {
		return (
			<CategoryCountByCityChart
				data={ data }
				keys={ keys }
			/>
		);
	})