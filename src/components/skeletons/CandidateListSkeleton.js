import React from "react";
import { SkeletonCircle, SkeletonBox } from "./Skeleton";
import "../../stylesheets/components/CandidateList.scss";
import "../../stylesheets/components/Candidate.scss";

export default function CandidateListSkeleton() {
	return (
		<div className="CandidateContainer">
			<div className="CandidateIndexList">
			{
				[{}, {}, {}].map((item, key) => (
					<div key={ key }>
						<SkeletonCircle
							width="20px"
							height="20px"
							display="inline-block"
							verticalAlign="top"
							marginRight="10px"
						/>
						<SkeletonBox
							width="80px"
							height="20px"
							display="inline-block"
							verticalAlign="top"
							marginTop="0px"
						/>
					</div>
				))
			}
			</div>
			<div className="CandidateList">
			{
				[{}, {}].map((item, key) => (
					<div className="Candidate" key={ key }>
						<div style={ { width: "100%" } }>
							<SkeletonCircle
								height="40px"
								width="40px"
								display="inline-block"
								marginRight="15px"
								verticalAlign="top"
							/>
							<SkeletonBox
								height="40px"
								width="20%"
								display="inline-block"
								marginTop="0px"
								verticalAlign="top"
							/>
						</div>
						<div style={ { width: "60%", display: "inline-block", float: "left" } }>
							<SkeletonBox height="40px"/>
							<SkeletonBox height="40px"/>
							<SkeletonBox height="40px"/>
						</div>
						<div style={ { width: "20%", display: "inline-block", float: "right" } }>
							<SkeletonBox height="20px"/>
							<SkeletonBox height="20px"/>
							<SkeletonBox height="20px"/>
						</div>
					</div>
				))
			}
			</div>
		</div>
	);
}