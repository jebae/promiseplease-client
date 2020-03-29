import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import DistrictPageContainer from "./containers/DistrictPageContainer";
import NotFound from "./components/NotFound";
import { loadGA, RouteTracker } from "./services/GA";
import "./stylesheets/base.scss";

export default class App extends React.Component {
	componentDidMount() {
		loadGA();
	}

	render() {
		return (
			<div className="App">
				<RouteTracker/>
				<NavBar/>
				<Switch>
					<Route exact path="/" component={ HomePage }/>
					<Route path="/constituency/:city/:constituency" component={ DistrictPageContainer}/>
					<Route component={ NotFound }/>
				</Switch>
				<Footer/>
			</div>
		);
	}
}