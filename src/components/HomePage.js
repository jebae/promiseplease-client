import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Jumbotron from "./Jumbotron";
import VoterCandidateCountContainer from "../containers/VoterCandidateCountContainer";
import DDay from "./DDay";
import GeneralInfoContainer from "../containers/GeneralInfoContainer";
import CategoryCountChartContainer from "../containers/CategoryCountChartContainer";
import CategoryCountByCityChartContainer from "../containers/CategoryCountByCityChartContainer";
import JobCountByGenerationChartContainer from "../containers/JobCountByGenerationChartContainer";
import GenderRatioByCityChartContainer from "../containers/GenderRatioByCityChartContainer";
import withSkeleton from "../utils/HOC/withSkeleton";
import HomePageSkeleton from "./skeletons/HomePageSkeleton";
import Head from "./Head";
import "../stylesheets/components/HomePage.scss";

const FETCH_COUNT = 11;

const head = {
	url: process.env.HOST_DOMAIN,
	title: "약속해줘 - 21대 총선 투표소와 후보 공약",
	description: "21대 국회의원 선거 투표소와 후보들의 공약을 찾아보세요",
	keywords: [ "총선", "21대 총선", "투표", "국회의원 선거", "선거", "투표소", "공약", ],
	image: "https://i.ibb.co/VwX4rW2/vote.jpg",
};

function HomePage(props) {
	const { fetchCountUp } = props;

	return (
		<div className="Page HomePage">
			<Head { ...head } />
			<Jumbotron/>
			<div className="GeneralInfo-Container">
				<VoterCandidateCountContainer fetchCountUp={ fetchCountUp }/>
				<DDay/>
				<GeneralInfoContainer
					fetchCountUp={ fetchCountUp }
				/>
			</div>
			<div className="Chart-Container">
				<CategoryCountChartContainer
					fetchCountUp={ fetchCountUp }
				/>
				<CategoryCountByCityChartContainer
					fetchCountUp={ fetchCountUp }
				/>
				<JobCountByGenerationChartContainer
					fetchCountUp={ fetchCountUp }
				/>
				<GenderRatioByCityChartContainer
					fetchCountUp={ fetchCountUp }
				/>
			</div>
		</div>
	);
}

HomePage.propTypes = {
	fetchCountUp: PropTypes.func,
}

export default withSkeleton({
	Skeleton: HomePageSkeleton, fetchCount: FETCH_COUNT
})(HomePage);