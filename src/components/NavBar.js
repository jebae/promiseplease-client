import React from "react";
import { Link } from "react-router-dom";
import SearchContainer from "../containers/SearchContainer";
import "../stylesheets/components/NavBar.scss";

function IconToHome() {
	return (
		<Link to="/">
			<div className="NavBar-Icon_toHome"></div>
		</Link>
	);
}

function Title() {
	return (
		<Link to="/">
			<div className="NavBar-Title">약속해줘</div>
		</Link>
	);
}

export default class NavBar extends React.Component {
	render() {
		return (
			<nav className="NavBar">
				<IconToHome/>
				<Title/>
				<SearchContainer/>
			</nav>
		);
	}
}