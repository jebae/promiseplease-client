import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { fetchVoteLocation } from "../services/VoteLocation";
import VoteLocation from "../components/VoteLocation";

const FAIL_MESSAGE = "Fail to get vote location";
const INITIAL_STATE = {
	locations: [],
	currentDistrict: -1,
};
const preVoteFinish = new Date("Apr 11 2020 18:00:00 GMT+0900");

class VoteLocationContainer extends React.Component {
	constructor(props) {
		super(props);
		this.findIndexOfDistrict = this.findIndexOfDistrict.bind(this);
		this.changeDistrict = this.changeDistrict.bind(this);
		this.changeType = this.changeType.bind(this);
		this.getVoteLocations = this.getVoteLocations.bind(this);
		this.state = {
			...INITIAL_STATE,
			currentType: (Date.now() > preVoteFinish.getTime())
				? "당일" : "사전"
		};
	}

	findIndexOfDistrict(locations, district) {
		return locations.findIndex(loc => loc.name === district);
	}

	getVoteLocations() {
		const { city, constituency } = this.props.match.params;
		
		fetchVoteLocation({ city, constituency })
			.then((res) => {
				if (res.status === 200) {
					const { locations } = res.data;

					if (locations && locations.length > 0) {
						this.setState({ locations, currentDistrict: 0 }, () => {
							this.props.fetchCountUp();
						});
					}
					return ;
				}
				this.props.fetchCountUp();
				console.error(FAIL_MESSAGE);
			}).catch((err) => {
				this.props.fetchCountUp();
				console.error(err);
			})
	}

	changeDistrict(index) {
		if (index !== this.state.currentDistrict)
			this.setState({ currentDistrict: index });
	}

	changeType(type) {
		if (type !== this.state.currentType)
			this.setState({ currentType: type });
	}

	componentDidUpdate(prevProps) {
		const { city, constituency } = this.props.match.params;

		if (prevProps.match.params.city !== city
			|| prevProps.match.params.constituency !== constituency)
			this.getVoteLocations();
	}

	render() {
		const { locations, currentDistrict, currentType } = this.state;

		return (
			<VoteLocation
				districts={ locations.map(loc => ({ name: loc.name })) }
				locations={
					(currentDistrict === -1)
					? []
					: locations[currentDistrict].locations
						.filter(loc => loc.type === currentType) }
				currentDistrict={ currentDistrict }
				currentType={ currentType }
				getVoteLocations={ this.getVoteLocations }
				changeDistrict={ this.changeDistrict }
				changeType={ this.changeType }
			/>
		);
	}
}

VoteLocationContainer.propTypes = {
	fetchCountUp: PropTypes.func,
};

export default withRouter(VoteLocationContainer);