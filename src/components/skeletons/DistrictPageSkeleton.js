import React from "react";
import CandidateListSkeleton from "./CandidateListSkeleton";
import DistrictDescSkeleton from "./DistrictDescSkeleton";
import VoteLocationSkeleton from "./VoteLocationSkeleton";
import "../../stylesheets/components/DistrictPage.scss";

export default function DistrictPageSkeleton() {
	return (
		<div className="Page DistrictPage">
			<DistrictDescSkeleton/>
			<VoteLocationSkeleton/>
			<CandidateListSkeleton/>
		</div>
	);
}