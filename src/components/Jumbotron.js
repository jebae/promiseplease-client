import React from "react";
import SearchContainer from "../containers/SearchContainer";
import "../stylesheets/components/Jumbotron.scss";

export default function JumboTron() {
	return (
		<div className="Jumbotron">
			<div className="Jumbotron-Background"></div>
			<SearchContainer/>
		</div>
	);
}