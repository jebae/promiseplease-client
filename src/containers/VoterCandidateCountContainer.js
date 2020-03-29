import React from "react";
import PropTypes from "prop-types";
import { fetchVoterCount } from "../services/Voter";
import { fetchCandidateCount } from "../services/Candidate";
import VoterCandidateCount from "../components/VoterCandidateCount";

const INITIAL_STATE ={
	voterCount: 0,
	candidateCount: 0,
};
const FAIL_MESSAGE = {
	voterCount: "Fail to get voter count",
	candidateCount: "Fail to get candidate count",
}

export default class VoterCandidateCountContainer extends React.Component {
	constructor(props) {
		super(props);
		this.getVoterCount = this.getVoterCount.bind(this);
		this.getCandidateCount = this.getCandidateCount.bind(this);
		this.state = { ...INITIAL_STATE };
	}

	getVoterCount() {
		fetchVoterCount()
			.then(res => {
				if (res.status === 200) {
					this.setState({ voterCount: res.data.count }, () => {
						this.props.fetchCountUp();
					});
					return ;
				}
				this.props.fetchCountUp();
				console.error(FAIL_MESSAGE.voterCount);
			})
			.catch(err => {
				console.log("err", err);
				this.props.fetchCountUp();
				console.error(err);
			});
	}

	getCandidateCount() {
		fetchCandidateCount({})
			.then(res => {
				if (res.status === 200) {
					this.setState({ candidateCount: res.data.count }, () => {
						this.props.fetchCountUp();
					});
					return ;
				}
				this.props.fetchCountUp();
				console.error(FAIL_MESSAGE.candidateCount);
			})
			.catch(err => {
				this.props.fetchCountUp();
				console.error(err);
			});
	}

	componentDidMount() {
		this.getVoterCount();
		this.getCandidateCount();
	}

	render() {
		return (
			<VoterCandidateCount
				voterCount={ parseInt(this.state.voterCount / 10000) }
				candidateCount={ this.state.candidateCount }
			/>
		);
	}
}

VoterCandidateCountContainer.propTypes = {
	fetchCountUp: PropTypes.func,
}