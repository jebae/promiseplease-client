import React from "react"
import PropTypes from "prop-types";
import { gaEvent } from "../services/GA";

export default function SearchInput(props) {	
	const { text, setText, handleBlur } = props;
	const handleChange = (event) => {
		setText(event.target.value);
	}

	const handleFocus = () => {
		props.handleFocus();
		gaEvent({
			category: "검색",
			action: "focus",
			label: "input",
		});
	}

	return (
		<input
			className="SearchInput"
			type="text"
			value={ text }
			onChange={ handleChange }
			onFocus={ handleFocus }
			onBlur={ handleBlur }
			placeholder="지역, 후보자를 검색해보세요"
			autoComplete="off"
		/>
	);
}

SearchInput.propTypes = {
	text: PropTypes.string.isRequired,
	setText: PropTypes.func.isRequired,
	handleFocus: PropTypes.func.isRequired,
	handleBlur: PropTypes.func.isRequired,
}