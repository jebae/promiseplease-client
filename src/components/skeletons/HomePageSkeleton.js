import React from "react";
import JumbotronSkeleton from "./JumbotronSkeleton";
import GeneralInfoSkeleton from "./GeneralInfoSkeleton";
import ChartSkeleton from "./ChartSkeleton";
import "../../stylesheets/components/HomePage.scss";

export default function HomePageSkeleton() {
	return (
		<div className="Page HomePage">
			<JumbotronSkeleton/>
			<div className="GeneralInfo-Container">
				<GeneralInfoSkeleton/>
				<GeneralInfoSkeleton/>
				<GeneralInfoSkeleton/>
			</div>
			<div className="Chart-Container">
				<ChartSkeleton/>
				<ChartSkeleton/>
				<ChartSkeleton/>
				<ChartSkeleton/>
			</div>
		</div>
	);
}