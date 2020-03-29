import React from "react";
import PropTypes from "prop-types";
import withCountUpInnerText from "../utils/HOC/withCountUpInnerText";
import "../stylesheets/components/GeneralInfo.scss";

const COUNTUP_DURATION = 5000;
const countUpOption = {
	propName: "value",
	duration: COUNTUP_DURATION,
}

const Section = React.forwardRef((props, ref) => {
	return (
		<div className="GeneralInfo-Section-Item">
			<div className={`GeneralInfo-Icon GeneralInfo-Icon_${props.attr}`}></div>
			<span className="GeneralInfo-Title">{ props.title }</span>
			<span ref={ ref } className="GeneralInfo-Value">{ props.value }</span>
		</div>
	);
});

const avgAge = React.forwardRef((props, ref) => {
	const attr = "avgAge";

	return (
		<Section
			title="입후보자 평균연령"
			attr={ attr }
			value={ props.value }
			ref={ ref }
		/>
	);
});

const minAge = React.forwardRef((props, ref) => {
	const attr = "minAge";

	return (
		<Section
			title="입후보자 최소연령"
			attr={ attr }
			value={ props.value }
			ref={ ref }
		/>
	);
});

const maxAge = React.forwardRef((props, ref) => {
	const attr = "maxAge";

	return (
		<Section
			title="입후보자 최고연령"
			attr={ attr }
			value={ props.value }
			ref={ ref }
		/>
	);
});

const partyCount = React.forwardRef((props, ref) => {
	const attr = "partyCount";

	return (
		<Section
			title="정당 수"
			attr={ attr }
			value={ props.value }
			ref={ ref }
		/>
	);
});

const manRatio = React.forwardRef((props, ref) => {
	return (
		<span ref={ ref }>{ props.value }</span>
	);
});

const womanRatio = React.forwardRef((props, ref) => {
	return (
		<span ref={ ref }>{ props.value }</span>
	);
});

const AvgAgeWithCountUp = withCountUpInnerText(countUpOption)(avgAge);
const MinAgeWithCountUp = withCountUpInnerText(countUpOption)(minAge);
const MaxAgeWithCountUp = withCountUpInnerText(countUpOption)(maxAge);
const PartyCountWithCountUp = withCountUpInnerText(countUpOption)(partyCount);
const ManRatioWithCountUp = withCountUpInnerText(countUpOption)(manRatio);
const WomanRatioWithCountUp = withCountUpInnerText(countUpOption)(womanRatio);

export default function GeneralInfo(props) {
	const { avgAge, minAge, maxAge, partyCount, manRatio, womanRatio } = props;

	return (
		<div className="GeneralInfo-Section">
			<AvgAgeWithCountUp value={ avgAge }/>
			<MinAgeWithCountUp value={ minAge }/>
			<MaxAgeWithCountUp value={ maxAge }/>
			<PartyCountWithCountUp value={ partyCount }/>
			<div className="GeneralInfo-Section-Item">
			<div className="GeneralInfo-Icon GeneralInfo-Icon_gender"></div>
				<span className="GeneralInfo-Title">성비</span>
				<div className="GeneralInfo-Value">
					<span> 여 </span>
					<ManRatioWithCountUp value={ props.womanRatio }/>
					<span> : </span>
					<WomanRatioWithCountUp value={ props.manRatio }/>
					<span> 남</span>
				</div>
			</div>			
		</div>
	);
}

GeneralInfo.propTypes = {
	avgAge: PropTypes.number,
	minAge: PropTypes.number,
	maxAge: PropTypes.number,
	partyCount: PropTypes.number,
	manRatio: PropTypes.number,
	womanRatio: PropTypes.number,
}