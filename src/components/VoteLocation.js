import React from "react";
import PropTypes from "prop-types";
import {
	loadKakaoMap,
	latLngObj, setNewCenter,
	setMarkerOn, setMarkerOff,
	initMarker, removeMarkers, createMarker,
} from "../services/KakaoMap";
import { gaEvent } from "../services/GA";
import "../stylesheets/components/VoteLocation.scss";

const INITIAL_STATE = {
	currentAddress: -1,
};
const MAP_CONTAINER_ID = "VoteLocation-Map";

function DistrictList(props) {
	const { districts, currentDistrict, changeDistrict } = props;

	return (
		<div className="VoteLocation-District-List">
		{
			districts.map((item, i) => (
				<div
					key={ item.name }
					className={ `VoteLocation-District ${(i === currentDistrict) ? "Focus" : ""}` }
					onClick={ () => changeDistrict(i) }
				>
					{ item.name }
				</div>
			))
		}
		</div>
	);
}

const VoteLocationAddress = React.forwardRef((props, ref) => {
	const { location, index, currentAddress, handleClickAddress } = props;

	return (
		<div
			key={ location.address }
			className="VoteLocation-Address"
			ref={ ref }
			onClick={ () => handleClickAddress(index) }
		>
			<div className={ (currentAddress === index) ? "Focus" : "" }>
				<div className="VoteLocation-Address-Icon"></div>
				<span className="VoteLocation-Address-Text">{ location.address }</span>
			</div>
		</div>
	);
});

function VoteLocationType(props) {
	const { changeType, currentType } = props;
	const types = [ "사전", "당일" ];

	return (
		<div className="VoteLocation-Type-Container">
		{
			types.map(type => (
				<div
					className="VoteLocation-Type"
					key={ type }
					onClick={ () => changeType(type) }
				>
					<span
						className={ (type === currentType) ? "Focus" : "" }
					>
						{ type }
					</span>
				</div>
			))
		}
		</div>
	);
}

export default class VoteLocation extends React.Component {
	constructor(props) {
		super(props);
		this.map = null;
		this.addressBox = React.createRef();
		this.addressRefs = [];
		this.markers = [];
		this.setAddressOff = this.setAddressOff.bind(this);
		this.setAddressOn = this.setAddressOn.bind(this);
		this.handleClickAddress = this.handleClickAddress.bind(this);
		this.handleClickMarker = this.handleClickMarker.bind(this);
		this.handleUpdateLocations = this.handleUpdateLocations.bind(this);
		this.state = { ...INITIAL_STATE };
	}

	setAddressOff() {
		const toOff = this.state.currentAddress;

		this.setState({ currentAddress: -1 }, () => {
			setMarkerOff(this.markers[toOff]);
		});
	}

	setAddressOn(index) {
		const toOff = this.state.currentAddress;

		this.setState({ currentAddress: index }, () => {
			if (toOff !== -1)
				setMarkerOff(this.markers[toOff]);
			setMarkerOn(this.markers[index]);
		});
	}

	handleClickAddress(index) {
		const { locations } = this.props;

		if (this.state.currentAddress === index) {
			this.setAddressOff();
			gaEvent({
				category: "투표소 > 주소 off",
				action: "click",
				label: locations[index].address,
			});
		} else {
			this.setAddressOn(index);
			const loc = locations[index];
			const latlng = latLngObj(loc.latitude, loc.longitude);

			this.map.panTo(latlng);
			gaEvent({
				category: "투표소 > 주소 on",
				action: "click",
				label: locations[index].address,
			});
		}
	}

	handleClickMarker(index) {
		this.setAddressOn(index);
		this.addressBox.current.scrollTo({
			top: this.addressRefs[index].current.offsetTop
				- this.addressBox.current.offsetTop,
			behavior: "smooth"
		});
		gaEvent({
			category: "투표소 > 지도 마커",
			action: "click",
			label: this.props.locations[index].address,
		});
	}

	handleUpdateLocations(locations) {
		removeMarkers(this.markers);
		this.addressRefs = locations.map(() => React.createRef());
		this.markers = locations.map(loc => createMarker(loc.latitude, loc.longitude));
		const center = locations.reduce((acc ,cur) => {
			acc.latitude += cur.latitude;
			acc.longitude += cur.longitude;
			return acc;
		}, { latitude: 0, longitude: 0 });

		center.latitude /= locations.length;
		center.longitude /= locations.length;
		this.markers.forEach((marker, i) => {
			initMarker(marker, this.map, () => this.handleClickMarker(i));
		});
		setNewCenter(this.map, center.latitude, center.longitude);
		this.setState({ currentAddress: -1 });
	}

	componentDidMount() {
		loadKakaoMap(MAP_CONTAINER_ID, (map) => {
			this.map = map;
			this.props.getVoteLocations();
		});
	}

	componentDidUpdate(prevProps) {
		const { locations } = this.props;

		if (JSON.stringify(prevProps.locations) !== JSON.stringify(locations)) {
			this.handleUpdateLocations(locations);
		}
	}

	render() {
		const {
			locations, districts,
			currentDistrict, currentType,
			changeDistrict, changeType
		} = this.props;
		const { currentAddress } = this.state;

		return (
			<div className="VoteLocation-Container">
				<div id={ MAP_CONTAINER_ID }></div>
				<div className="VoteLocation-Address-Container">
					<div className="VoteLocation-Title">투표소</div>
					<VoteLocationType
						currentType={ currentType }
						changeType={ changeType }
					/>
					<DistrictList
						districts={ districts }
						currentDistrict={ currentDistrict }
						changeDistrict={ changeDistrict }
					/>
					<div className="VoteLocation-Address-List" ref={ this.addressBox }>
					{
						locations.map((item, i) => (
							<VoteLocationAddress
								key={ item.address }
								location={ item }
								index={ i }
								currentAddress={ currentAddress }
								handleClickAddress={ this.handleClickAddress }
								ref={ this.addressRefs[i] }
							/>
						))
					}
					</div>
				</div>
			</div>
		);
	}
}

DistrictList.propTypes = {
	districts: PropTypes.array.isRequired,
	currentDistrict: PropTypes.number.isRequired,
	changeDistrict: PropTypes.func.isRequired,
}

VoteLocationAddress.propTypes = {
	location: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	currentAddress: PropTypes.number.isRequired,
	handleClickAddress: PropTypes.func.isRequired,
}

VoteLocationType.propTypes = {
	currentType: PropTypes.string.isRequired,
	changeType: PropTypes.func.isRequired,
}

VoteLocation.propTypes = {
	districts: PropTypes.array.isRequired,
	locations: PropTypes.array.isRequired,
	currentDistrict: PropTypes.number.isRequired,
	currentType: PropTypes.string.isRequired,
	getVoteLocations: PropTypes.func.isRequired,
	changeDistrict: PropTypes.func.isRequired,
	changeType: PropTypes.func.isRequired,
}