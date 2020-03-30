import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { gaPage } from "../services/GA";

function RouteTracker(props) {
	const { pathname } = props.location;

	useEffect(() => {
		window.scrollTo(0, 0);
		gaPage(pathname);
	}, [ pathname ]);
	return null;
};

export default withRouter(RouteTracker);