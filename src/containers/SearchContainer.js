import React from "react";
import Search from "../components/Search";

const INITIAL_STATE = {
	text: "",
	showAutoComplete: false
};

export default class SearchContainer extends React.Component {
	constructor(props) {
		super(props);
		this.setText = this.setText.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
		this.state = { ...INITIAL_STATE };
	}

	setText(text) {
		this.setState({ text });
	}

	handleFocus() {
		this.setState({ showAutoComplete: true });
	}

	handleBlur() {
		this.setState({ showAutoComplete: false });
	}

	render() {
		const { text, showAutoComplete } = this.state;

		return (
			<Search
				text={ text }
				showAutoComplete={ showAutoComplete }
				setText={ this.setText }
				handleFocus={ this.handleFocus }
				handleBlur={ this.handleBlur }
			/>
		);
	}
}