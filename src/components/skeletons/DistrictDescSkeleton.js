import React from "react";
import { SkeletonCircle, SkeletonBox } from "./Skeleton";
import "../../stylesheets/components/DistrictDesc.scss";

export default function DistrictDescSkeleton() {
	return (
		<div className="DistrictDesc">
			<div className="DistrictDesc-Name">
				<SkeletonBox height="30px" width="150px"/>
			</div>
			<div className="DistrictDesc-InfoContainer">
				<SkeletonBox height="15px" width="150px"/>
				<SkeletonBox height="15px" width="150px"/>
			</div>
		</div>
	);
}