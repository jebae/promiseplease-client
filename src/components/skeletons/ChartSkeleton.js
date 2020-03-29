import React from "react";
import { SkeletonBox } from "./Skeleton";
import "../../stylesheets/components/Chart.scss";

export default function ChartSkeleton() {
	const heights = [20, 50, 30, 20];

	return (
		<div className="Chart-Section">
		{
			heights.map((item, key) => (
				<SkeletonBox
					key={ key }
					width="calc(25% - 20px)"
					height={ `${item * 5}px` }
					display="inline-block"
					verticalAlign="bottom"
					margin="10px"
					marginTop="60px"
				/>
			))
		}
		</div>
	);
}