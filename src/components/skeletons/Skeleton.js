import React from "react";
import "../../stylesheets/components/Skeleton.scss";

export function SkeletonCircle(props) {
	return <div className="Skeleton-Circle" style={ { ...props } }></div>;
}

export function SkeletonBox(props) {
	return <div className="Skeleton-Box" style={ { ...props } }></div>;
}