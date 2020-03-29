import React from "react";
import { storiesOf } from "@storybook/react";
import DistrictDesc from "./DistrictDesc";
import withMemoryRouter from "../../.test_utils/withMemoryRouter";

const descSample = {
	avgAge: 54,
	manCount: 4,
	womanCount: 2
};

storiesOf("DistrictDesc", module)
	.add("init", () => {
		const Component = withMemoryRouter({
			path: "/constituency/:city/:constituency",
			initialEntry: "/constituency/서울/마포구을"
		})(DistrictDesc);

		return (
			<Component
				avgAge={ descSample.avgAge }
				manCount={ descSample.manCount }
				womanCount={ descSample.womanCount }
			/>
		);
	})
	.add("no avgAge", () => {
		const Component = withMemoryRouter({
			path: "/constituency/:city/:constituency",
			initialEntry: "/constituency/서울/마포구을"
		})(DistrictDesc);

		return (
			<Component
				// avgAge={ descSample.avgAge }
				manCount={ descSample.manCount }
				womanCount={ descSample.womanCount }
			/>
		);
	})
	.add("no manCount", () => {
		const Component = withMemoryRouter({
			path: "/constituency/:city/:constituency",
			initialEntry: "/constituency/서울/마포구을"
		})(DistrictDesc);

		return (
			<Component
				avgAge={ descSample.avgAge }
				// manCount={ descSample.manCount }
				womanCount={ descSample.womanCount }
			/>
		);
	})
	.add("no womanCount", () => {
		const Component = withMemoryRouter({
			path: "/constituency/:city/:constituency",
			initialEntry: "/constituency/서울/마포구을"
		})(DistrictDesc);

		return (
			<Component
				avgAge={ descSample.avgAge }
				manCount={ descSample.manCount }
				// womanCount={ descSample.womanCount }
			/>
		);
	})
	.add("no manCount, womanCount", () => {
		const Component = withMemoryRouter({
			path: "/constituency/:city/:constituency",
			initialEntry: "/constituency/서울/마포구을"
		})(DistrictDesc);

		return (
			<Component
				avgAge={ descSample.avgAge }
				// manCount={ descSample.manCount }
				// womanCount={ descSample.womanCount }
			/>
		);
	})