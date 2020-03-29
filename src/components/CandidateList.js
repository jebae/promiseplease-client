import React from "react";
import PropTypes from "prop-types";
import Candidate from "../components/Candidate";
import CandidateIndex from "../components/CandidateIndex";
import "../stylesheets/components/CandidateList.scss";

export default function CandidateList(props) {
	const { candidates } = props;
	const refs = candidates.reduce((acc, cur) => {
		acc[cur.number] = React.createRef();
		return acc;
	}, {});
	const getTop = (elem) => {
		let top = 0;

		while (elem) {
			top += elem.offsetTop;
			elem = elem.offsetParent;
		}
		return top;
	}
	const scrollToView = (number) => {
		window.scrollTo({
			top: getTop(refs[number].current) - 60,
			behavior: "smooth"
		});
	};
	
	return (
		<div className="CandidateContainer">
			<div className="CandidateIndexList">
			{
				candidates.map((item, key) => (
					<CandidateIndex
						key={ `index-${item.number}` }
						scrollToView={ () => scrollToView(item.number) }
						number={ item.number }
						name={ item.name }
						color={ item.color }
						party={ item.party }
					/>
				))
			}
			</div>
			<div className="CandidateList">
			{
				candidates.map((item, key) => (
					<div
						ref={ refs[item.number] }
						key={ `candidate-${item.number}` }
					>
						<Candidate
							number={ item.number }
							name={ item.name }
							birth={ item.birth }
							color={ item.color }
							party={ item.party }
							promiseCats={ item.promiseCats }
							promises={ item.promises }
							careers={ item.careers }
						/>
					</div>
				))
			}
			</div>
		</div>
	);
}

CandidateList.propTypes = {
	candidates: PropTypes.array
}