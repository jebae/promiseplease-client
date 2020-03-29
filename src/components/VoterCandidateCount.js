import React from "react";
import PropTypes from "prop-types";
import withCountUpInnerText from "../utils/HOC/withCountUpInnerText";
import "../stylesheets/components/VoterCandidateCount.scss";

const COUNTUP_DURATION = 5000;

const VoterCount = React.forwardRef((props, ref) => {
	return (
		<div className="VoterCandidateCount-Section">
			<div className="VoterCandidateCount-Icon VoterCandidateCount-Icon_voter"></div>
			<div className="VoterCandidateCount-Title">유권자 수</div>
			<div className="VoterCandidateCount-Count">
				<span ref={ ref }>{ props.voterCount }</span>
				<span className="VoterCandidateCount-Count-Unit">만</span>
			</div>
		</div>
	);
});

const CandidateCount = React.forwardRef((props, ref) => {
	return (
		<div className="VoterCandidateCount-Section">
			<div className="VoterCandidateCount-Icon VoterCandidateCount-Icon_candidate"></div>
			<div className="VoterCandidateCount-Title">후보자 수</div>
			<div className="VoterCandidateCount-Count">
				<span ref={ ref }>{ props.candidateCount }</span>
			</div>
		</div>
	);
});

const VoterCountWithCountUp = withCountUpInnerText({
	propName: "voterCount", duration: 5000
})(VoterCount);
const CandidateCountWithCountUp = withCountUpInnerText({
	propName: "candidateCount", duration: 5000
})(CandidateCount);

export default function VoterCandidateCount(props) {
	return (
		<div className="GeneralInfo-Section">
			<VoterCountWithCountUp voterCount={ props.voterCount }/>
			<CandidateCountWithCountUp candidateCount={ props.candidateCount }/>
		</div>
	);
}

VoterCount.propTypes = {
	voterCount: PropTypes.number
}

CandidateCount.propTypes = {
	candidateCount: PropTypes.number
}

VoterCandidateCount.propTypes = {
	voterCount: PropTypes.number,
	candidateCount: PropTypes.number,
}