import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import compose from "../utils/HOC/compose";
import withSkeleton from "../utils/HOC/withSkeleton";
import DistrictPageSkeleton from "../components/skeletons/DistrictPageSkeleton";
import DistrictPage from "../components/DistrictPage";

const FETCH_COUNT = 2;

const INITIAL_STATE = {
	genderCount: { man: 0, woman: 0 },
	avgAge: 0,
};

export class DistrictPageContainer extends React.Component {
	constructor(props) {
		super(props);
		this.notifyCandidateGeneralInfo = this.notifyCandidateGeneralInfo.bind(this);
		this.state = { ...INITIAL_STATE };
	}

	notifyCandidateGeneralInfo({ genderCount, avgAge }) {
		this.setState({ genderCount, avgAge });
	}

	componentDidUpdate(prevProps) {
		const { city, constituency } = this.props.match.params;

		if (prevProps.match.params.city !== city
			|| prevProps.match.params.constituency !== constituency)
			this.props.fetchCountInit();
	}

	render() {
		const { genderCount, avgAge } = this.state;

		return (
			<DistrictPage
				genderCount={ genderCount }
				avgAge={ avgAge }
				notifyCandidateGeneralInfo={ this.notifyCandidateGeneralInfo }
				fetchCountUp={ this.props.fetchCountUp }
			/>
		);
	}
}

DistrictPageContainer.propTypes = {
	fetchCountUp: PropTypes.func,
	fetchCountInit: PropTypes.func,
}

export default compose(
	withRouter,
	withSkeleton({ Skeleton: DistrictPageSkeleton, fetchCount: FETCH_COUNT }),
)(DistrictPageContainer);