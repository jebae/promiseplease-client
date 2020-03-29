import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/components/CandidateIndex.scss";

export default function CandidateIndex(props) {
	const { number, name, party, color, scrollToView } = props;
	const numberStyle = {
		"backgroundImage": `linear-gradient(135deg, ${color.start}, ${color.end})`
	};

	return (
		<div className="CandidateIndex" onClick={ scrollToView }>
			<span className="CandidateIndex-Number" style={ numberStyle }>{ number }</span>
			<span className="CandidateIndex-Name">{ name }</span>
			<span className="CandidateIndex-Party">{ party }</span>
		</div>
	);
}

CandidateIndex.propTypes = {
	number: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	color: PropTypes.object,
	party: PropTypes.string,
	scrollToView: PropTypes.func.isRequired
};