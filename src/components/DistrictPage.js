import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import DistrictDesc from "./DistrictDesc";
import CandidateContainer from "../containers/CandidateContainer";
import VoteLocationContainer from "../containers/VoteLocationContainer";
import Head from "./Head";
import "../stylesheets/components/DistrictPage.scss";

const head = {
	titleSuffix: "의 투표소와 후보 공약",
	descriptionSuffix: "의 투표소와 후보들의 공약을 살펴보세요",
	keywords: [ "총선", "21대 총선", "투표", "국회의원 선거", "선거", "투표소", "공약", ],
	image: "https://www.dropbox.com/s/vbq4p10qaw4fz0e/vote.jpg?raw=1",
}

function DistrictPage(props) {
	const {
		notifyCandidateGeneralInfo,
		genderCount,
		avgAge,
		fetchCountUp,
	} = props;
	const { city, constituency } = props.match.params;

	return (
		<div className="Page DistrictPage">
			<Head
				title={ `${city} ${constituency}${head.titleSuffix}` }
				description={ `${city} ${constituency}${head.descriptionSuffix}` }
				keywords={ [ ...head.keywords, city, constituency ] }
				image={ head.image }
			/>
			<DistrictDesc
				avgAge={ avgAge }
				manCount={ genderCount.man }
				womanCount={ genderCount.woman }
			/>
			<VoteLocationContainer
				fetchCountUp={ fetchCountUp }
			/>
			<CandidateContainer
				notifyCandidateGeneralInfo={ notifyCandidateGeneralInfo }
				fetchCountUp={ fetchCountUp }
			/>
		</div>
	);
}

DistrictPage.propTypes = {
	genderCount: PropTypes.object,
	avgAge: PropTypes.number,
	notifyCandidateGeneralInfo: PropTypes.func,
	fetchCountUp: PropTypes.func,
}

export default withRouter(DistrictPage);