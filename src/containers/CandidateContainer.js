import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { fetchCandidates } from "../services/Candidate";
import CandidateList from "../components/CandidateList";

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;
const FAIL_MESSAGE = "Fail to get vote location";
const GRADIENT_COLOR_DELTA = 170;
const INITIAL_STATE = {
	candidates: []
};

class CandidateContainer extends React.Component {
	constructor(props) {
		super(props);
		this.getCandidates = this.getCandidates.bind(this);
		this.getGenderCount = this.getGenderCount.bind(this);
		this.getAvgAge = this.getAvgAge.bind(this);
		this.getGradientColor = this.getGradientColor.bind(this);
		this.getPromiseCats = this.getPromiseCats.bind(this);
		this.state = { ...INITIAL_STATE };
	}

	getGenderCount(candidates) {
		return candidates.reduce((acc, cur) => {
			if (cur.gender === "man")
				acc.man++;
			else if (cur.gender === "woman")
				acc.woman++;
			return acc;
		}, {man: 0, woman: 0});
	}

	getAvgAge(candidates) {
		return Math.ceil(candidates.reduce((acc, cur) => (
			acc + Date.now() - (new Date(cur.birth)).getTime()
		), 0) / ONE_YEAR / candidates.length);
	}

	getGradientColor(color) {
		let hex = parseInt(`0x${color}`);
		let rgb = [
			parseInt((hex & 0xff0000) >> 16),
			parseInt((hex & 0x00ff00) >> 8),
			parseInt(hex & 0x0000ff)
		];

		return {
			start: rgb.reduce((acc, cur) => (
				acc + `0${Math.min(cur + GRADIENT_COLOR_DELTA, 0xff).toString(16)}`.slice(-2)
			), "#"),
			end: rgb.reduce((acc, cur) => (
				acc + `0${Math.max(cur - (GRADIENT_COLOR_DELTA / 2), 0x00).toString(16)}`.slice(-2)
			), "#"),
		}
	}

	getPromiseCats(promises) {
		const promiseCats = promises.reduce((acc, cur) => {
			cur.cat.forEach(cat => {
				if (cat in acc)
					acc[cat]++;
				else
					acc[cat] = 1;
			});
			return acc;
		}, {});

		return Object.keys(promiseCats).map(cat => ({
			cat: cat,
			count: promiseCats[cat],
		}))
		.sort((a, b) => (a.count < b.count) ? 1 : -1);
	}

	getCandidates() {
		const { city, constituency } = this.props.match.params;
		const { notifyCandidateGeneralInfo, fetchCountUp } = this.props;
		const successCallback = () => {
			notifyCandidateGeneralInfo({
				genderCount: this.getGenderCount(this.state.candidates),
				avgAge: this.getAvgAge(this.state.candidates)
			});
			fetchCountUp();
		}
		const failCallback = () => {
			notifyCandidateGeneralInfo({
				genderCount: { man: 0, woman: 0 },
				avgAge: 0
			});
			fetchCountUp();
		}

		fetchCandidates({ city, constituency })
			.then(res => {
				if (res.status === 200) {
					let candidates = res.data.candidates
						.map(candidate => ({
							...candidate,
							party: candidate.party || "무소속",
							color: this.getGradientColor(candidate.color || "A9A9A9"),
							promiseCats: this.getPromiseCats(candidate.promises),
							promises: candidate.promises.map(p => p.content),
						}))
						.sort((a, b) => (a.number > b.number) ? 1 : -1);
					this.setState({ candidates }, successCallback);
					return ;
				}
				console.log("not 200");
				this.setState({ candidates: [] }, failCallback);
			})
			.catch(err => {
				this.setState({ candidates: [] }, failCallback);
			});
	}

	componentDidMount() {
		this.getCandidates();
	}

	componentDidUpdate(prevProps) {
		const { city, constituency } = this.props.match.params;

		if (prevProps.match.params.city !== city
			|| prevProps.match.params.constituency !== constituency)
			this.getCandidates();
	}

	render() {
		return (
			<CandidateList
				candidates={ this.state.candidates }
			/>
		);
	}
}

CandidateContainer.propTypes = {
	notifyCandidateGeneralInfo: PropTypes.func.isRequired,
	fetchCountUp: PropTypes.func,
}

export default withRouter(CandidateContainer);