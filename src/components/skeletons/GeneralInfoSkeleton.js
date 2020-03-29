import React from "react";
import { SkeletonBox, SkeletonCircle } from "./Skeleton";
import "../../stylesheets/components/GeneralInfo.scss";

export default function GeneralInfoSkeleton() {
	return (
		<div className="GeneralInfo-Section">
		{
			[{}, {}, {}].map((item, key) => (
				<div key={ key } style={ { marginTop: "5px" } }>
					<SkeletonCircle
						width="20px"
						height="20px"
						verticalAlign="top"
						display="inline-block"
						marginRight="10px"
					/>
					<SkeletonBox
						width="70%"
						height="20px"
						verticalAlign="top"
						display="inline-block"
						marginTop="0px"
					/>
				</div>
			))
		}
		</div>
	);
}