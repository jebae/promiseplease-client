import React from "react";
import { SkeletonCircle, SkeletonBox } from "./Skeleton";
import "../../stylesheets/components/VoteLocation.scss";

export default function VoteLocationSkeleton() {
	return (
		<div className="VoteLocation-Container">
			<div className="VoteLocation-Map">
				<SkeletonBox
					width="80%"
					height="80%"
					transform="translate(-50%, -50%)"
					left="50%"
					top="50%"
					position="relative"
				/>
			</div>
			<div className="VoteLocation-Address-Container">
				<SkeletonBox height="20px" width="20%"/>
				<SkeletonBox height="15px" width="40%"/>
				<div className="VoteLocation-Address-List">
					<div className="VoteLocation-Address">
						<SkeletonBox width="70%" height="15px"/>
					</div>
					<div className="VoteLocation-Address">
						<SkeletonBox width="70%" height="15px"/>
					</div>
					<div className="VoteLocation-Address">
						<SkeletonBox width="70%" height="15px"/>
					</div>
				</div>
			</div>
		</div>
	);
}