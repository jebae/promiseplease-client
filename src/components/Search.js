import React from "react";
import PropTypes from "prop-types";
import SearchInput from "./SearchInput";
import AutoCompleteContainer from "../containers/AutoCompleteContainer";
import "../stylesheets/components/Search.scss";

export default function Search(props) {
	const {
		handleBlur, handleFocus, setText,
		text, showAutoComplete
	} = props;

	return (
		<div className="Search-Container">
			<div className="Search-Input-Wrapper">
				<div className="Search-Icon"></div>
				<SearchInput
					text={ text }
					setText={ setText }
					handleFocus={ handleFocus }
					handleBlur={ handleBlur }
				/>
			</div>
			<AutoCompleteContainer
				text={ text }
				visible={ showAutoComplete }
				setText={ setText }
			/>
		</div>
	);
}

Search.propTypes = {
	text: PropTypes.string.isRequired,
	showAutoComplete: PropTypes.bool.isRequired,
	setText: PropTypes.func.isRequired,
	handleFocus: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired
};