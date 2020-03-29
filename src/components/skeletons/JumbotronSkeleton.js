import React from "react";
import { SkeletonBox } from "./Skeleton";
import "../../stylesheets/components/Jumbotron.scss";
import { lightGray } from "../../stylesheets/utils/_variable.scss";

export default function JumbotronSkeleton() {
	return (
		<div className="Jumbotron" style={ { backgroundColor: lightGray } }>
			<div className="Jumbotron-Background"></div>
		</div>
	);
}