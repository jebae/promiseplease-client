import React from "react";
import PropTypes from "prop-types";
import "../stylesheets/components/Candidate.scss";

const noPromisesMessage = "공개된 공약이 없습니다";
const noCareersMessage = "공개된 이력이 없습니다";

function Profile(props) {
	const { number, name, birth, color } = props;
	const numberStyle = {
		"backgroundImage": `linear-gradient(135deg, ${color.start}, ${color.end})`
	};

	return (
		<div className="Candidate-Profile">
			<span className="Candidate-Number" style={ numberStyle }>{ number }</span>
			<span className="Candidate-Name">{ name }</span>
			<span className="Candidate-birth">{ birth.replace(/-/g, ".") }</span>
		</div>
	);
}

function Party(props) {
	const { party, color } = props;

	return (
		<svg height="100" width="100" className="Candidate-Party">
			<defs>
				<linearGradient id={ `grad-${party}`} x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor={ color.start } stopOpacity={ 1 }/>
					<stop offset="100%" stopColor={ color.end } stopOpacity={ 1 }/>
				</linearGradient>
			</defs>
			<polygon points="0,0 100,100 100,50 50,0" fill={ `url(#grad-${party})` } />
			<text textAnchor="middle" transform="translate(58 42) rotate(45)" fill="#FFFFFF">{ party }</text>
		</svg>
	);
}

function PromiseCategories(props) {
	const { promiseCats } = props;

	return (
		<div className="Candidate-PromiseCategories">
		{
			promiseCats.map(item => (
				<div className="Candidate-PromiseCategory-Tag" key={ item.cat }>
					<span className="Candidate-PromiseCategory-cat">{ item.cat }</span>
					<span className="Candidate-PromiseCategory-count">{ item.count }</span>
				</div>
			))
		}
		</div>
	);
}

function Promises(props) {
	return (
		<div className="Candidate-Promises">
			<ul>
			{
				(props.promises && props.promises.length > 0)
				? props.promises.map((item, key) => (
					<li key={ `${key}-${item}` }>{ item }</li>
				))
				: <span className="Candidate-NoData">{ noPromisesMessage }</span>
			}
			</ul>
		</div>
	);
}

function Careers(props) {
	return (
		<div className="Candidate-Careers">
			<ul>
			{
				(props.careers && props.careers.length > 0)
				? props.careers.map((item, key) => (
					<li key={ `${key}-${item}` }>{ item }</li>
				))
				: <span className="Candidate-NoData">{ noCareersMessage }</span>
			}
			</ul>
		</div>
	);
}

export default function Candidate(props) {
	const {
		number, name, birth, color,
		party,
		promiseCats,
		promises,
		careers
	} = props;

	return (
		<div className="Candidate">
			<Profile
				number={ number }
				name={ name }
				birth={ birth }
				color={ color }
			/>
			<Party party={ party } color={ color }/>
			<PromiseCategories promiseCats={ promiseCats }/>
			<Promises promises={ promises }/>
			<Careers careers={ careers }/>
		</div>
	);
}

Profile.propTypes = {
	number: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	birth: PropTypes.string,
	color: PropTypes.object,
};

Party.propTypes = {
	party: PropTypes.string.isRequired,
	color: PropTypes.object,
}

PromiseCategories.propTypes = {
	promiseCats: PropTypes.array,
}

Promises.propTypes = {
	promises: PropTypes.array
}

Careers.propTypes = {
	careers: PropTypes.array
}

Candidate.propTypes = {
	number: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	birth: PropTypes.string,
	color: PropTypes.object,
	party: PropTypes.string,
	promiseCats: PropTypes.array,
	promises: PropTypes.array,
	careers: PropTypes.array
}