import React from "react";
import { storiesOf } from "@storybook/react";
import JobCountByGenerationChart from "./JobCountByGenerationChart";

const data = [
	{ generation: 50, "기업인": 34, "교육자": 10, "법조인": 21, },
	{ generation: 30, "정치인": 120, "기업인": 103, "교육자": 21, "자영업자": 40, "외교관": 3, },
	{ generation: 20, "정치인": 230, "기업인": 100, "교육자": 30, "자영업자": 20, "교수": 19, "법조인": 4, },
	{ generation: 60, "정치인": 110, "교육자": 21, "자영업자": 78, "교수": 17, "법조인": 3, },
	{ generation: 70, "정치인": 64, "교육자": 12, "자영업자": 38, },
	{ generation: 40, "정치인": 60, "기업인": 32, "교육자": 67, "교수": 19, "법조인": 43, },
];
const keys = [ "정치인", "기업인", "교육자", "자영업자", "교수", "법조인", "외교관" ];

storiesOf("JobCountByGenerationChart", module)
	.add("init", () => {
		return (
			<JobCountByGenerationChart
				data={ data }
				keys={ keys }
			/>
		);
	})