import React from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { gaEvent } from "../services/GA";

function AutoCompleteList(props) {
	const handleScroll = (event) => {
		const { pending, getNext } = props;
		
		if (pending)
			return ;
		if (event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight) {
			getNext();
			gaEvent({
				category: "검색",
				action: "scroll",
				label: "자동완성 더보기",
			});
		}
	}

	const handleMouseDown = (city, constituency) => {
		props.setText("");
		props.history.push(`/constituency/${city}/${constituency}`);
		gaEvent({
			category: "검색",
			action: "click",
			label: "자동완성 페이지 이동",
		});
	}
	
	const { words, visible, pending } = props;

	return (
		<div
			className={`AutoComplete-Wrapper ${(!visible || words.length === 0) ? "hidden" : ""}`}
			onScroll={ handleScroll }
		>
			<ul className="AutoComplete-ul">
				{
					words.map((item, key) => (
						<li key={ `${key}-${item}` } onMouseDown={ () => handleMouseDown(item.city, item.constituency) }>
							<span className="AutoComplete-Word">{item.word}</span>
							<span className="AutoComplete-Type">
							{
								(item.type === "후보")
								? `${item.city} ${item.constituency} ${item.type}` 
								: item.type
							}
							</span>
						</li>
					))
				}
				<li className={`AutoComplete-Loader ${(!pending) ? "hidden" : ""}`}>
					<span>.</span><span>.</span><span>.</span>
				</li>
			</ul>
		</div>
	);
}

AutoCompleteList.propTypes = {
	words: PropTypes.array.isRequired,
	visible: PropTypes.bool.isRequired,
	pending: PropTypes.bool.isRequired,
	getNext: PropTypes.func.isRequired,
	setText: PropTypes.func.isRequired,
}

export default withRouter(AutoCompleteList);