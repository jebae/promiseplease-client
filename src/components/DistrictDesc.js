import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "../stylesheets/components/DistrictDesc.scss";

function AvgAge(props) {
	return (
		<div className="DistrictDesc-AvgAge">
			<span className="DistrictDesc-Icon DistrictDesc-Icon_human"></span>
			<span>후보자 평균연령 { props.avgAge } 세</span>
		</div>
	);
}

function GenderCount(props) {
	const { manCount, womanCount } = props;

	return (
		<div className="DistrictDesc-GenderCount">
			<span className="DistrictDesc-Icon DistrictDesc-Icon_gender"></span>
			<span>후보자 성비 </span>
			{ (womanCount) ? <span>여 { womanCount } </span> : null }
			{ (manCount) ? <span>남 { manCount } </span> : null }
		</div>
	);
}

function DistrictDesc(props) {
	const { city, constituency } = props.match.params;
	const { avgAge, manCount, womanCount } = props;

	return (
		<div className="DistrictDesc">
			<div className="DistrictDesc-Name">{ city } { constituency }</div>
			<div className="DistrictDesc-InfoContainer">
			{ (avgAge) ? <AvgAge avgAge={ avgAge }/> : null }
			{ 
				(manCount || womanCount)
				? <GenderCount manCount={ manCount } womanCount={ womanCount }/>
				: null
			}
			</div>
		</div>
	);
}

AvgAge.propTypes = {
	avgAge: PropTypes.number.isRequired
}

GenderCount.propTypes = {
	manCount: PropTypes.number,
	womanCount: PropTypes.number
}

DistrictDesc.propTypes = {
	avgAge: PropTypes.number,
	manCount: PropTypes.number,
	womanCount: PropTypes.number
}

export default withRouter(DistrictDesc);