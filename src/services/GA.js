import React, { useEffect, useRef } from "react";
import { Route } from "react-router-dom";

const GA_TRACK_ID = process.env.GA_TRACK_ID;

export const loadGA = () => {
	(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,"script","https://www.google-analytics.com/analytics.js","ga");
		
	ga("create", GA_TRACK_ID, "auto");
}

export const gaEvent = ({ category, action, label }) => {
	(window.ga) && ga("send", "event", category, action, label || "");
}

function GA(props) {
	const { pathname } = props.location;

	useEffect(() => {
		(window.ga) && ga("send", {
			hitType: "pageview",
			page: pathname,
		});
	}, [ pathname ]);
	return null;
}

export function RouteTracker() {
	return <Route component={ GA }/>;
};