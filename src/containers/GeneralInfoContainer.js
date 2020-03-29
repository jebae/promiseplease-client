import React from "react";
import PropTypes from "prop-types";
import GeneralInfo from "../components/GeneralInfo";
import { fetchCandidateAge, fetchCandidateCount } from "../services/Candidate";
import { fetchPartyCount } from "../services/Party";

const INITIAL_STATE ={
	avgAge: 0,
	minAge: 0,
	maxAge: 0,
	partyCount: 0,
	manRatio: 0,
	womanRatio: 0,
};
const FAIL_MESSAGE = {
	avgAge: "Fail to get candidate average age",
	minAge: "Fail to get candidate minimum age",
}

export default class GeneralInfoContainer extends React.Component {
	constructor(props) {
		super(props);
		this.getAggregateAge = this.getAggregateAge.bind(this);
		this.getAvgAge = this.getAvgAge.bind(this);
		this.getMinAge = this.getMinAge.bind(this);
		this.getMaxAge = this.getMaxAge.bind(this);
		this.getPartyCount = this.getPartyCount.bind(this);
		this.getGenderRatio = this.getGenderRatio.bind(this);
		this.state = { ...INITIAL_STATE };
	}

	getAggregateAge(aggregate, stateName, failMessage) {
		fetchCandidateAge({ aggregate })
			.then(res => {
				if (res.status === 200) {
					this.setState({ [stateName]: res.data.age }, () => {
						this.props.fetchCountUp();
					});
					return ;
				}
				this.props.fetchCountUp();
				console.error(failMessage);
			})
			.catch(err => {
				this.props.fetchCountUp();
				console.error(err);
			});
	}

	getAvgAge() {
		this.getAggregateAge("avg", "avgAge", FAIL_MESSAGE.avgAge);
	}

	getMinAge() {
		this.getAggregateAge("min", "minAge", FAIL_MESSAGE.minAge);
	}

	getMaxAge() {
		this.getAggregateAge("max", "maxAge", FAIL_MESSAGE.maxAge);
	}

	getPartyCount() {
		fetchPartyCount()
			.then(res => {
				if (res.status === 200) {
					this.setState({ partyCount: res.data.count }, () => {
						this.props.fetchCountUp();
					});
					return ;
				}
				this.props.fetchCountUp();
				console.error(failMessage);
			})
			.catch(err => {
				this.props.fetchCountUp();
				console.error(err);
			});
	}

	getGenderRatio() {
		fetchCandidateCount({ groupby: [ "gender" ] })
			.then(res => {
				if (res.status === 200) {
					const { man, woman } = res.data.count;
					const manRatio = 
						parseInt(man / (man + woman) * 100);
					this.setState({ manRatio, womanRatio: 100 - manRatio }, () => {
						this.props.fetchCountUp();
					});
					return ;
				}
				this.props.fetchCountUp();
				console.error(failMessage);
			})
			.catch(err => {
				this.props.fetchCountUp();
				console.error(err);
			});
	}

	componentDidMount() {
		this.getAvgAge();
		this.getMinAge();
		this.getMaxAge();
		this.getPartyCount();
		this.getGenderRatio();
	}

	render() {
		const {
			avgAge, minAge, maxAge, partyCount, manRatio, womanRatio
		} = this.state;

		return (
			<GeneralInfo
				avgAge={ avgAge }
				minAge={ minAge }
				maxAge={ maxAge }
				partyCount={ partyCount }
				manRatio={ manRatio }
				womanRatio={ womanRatio }
			/>
		);
	}	
}

GeneralInfoContainer.propTypes = {
	fetchCountUp: PropTypes.func,	
}