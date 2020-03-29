import React from "react";
import PropTypes from "prop-types";
import { fetchWords } from "../services/Word";
import AutoCompleteList from "../components/AutoCompleteList";

const FAIL_MESSAGE = "Fail to get autocomplete list";
const INITIAL_STATE = {
	words: [],
	text: "",
	next: null,
	pending: false
}

export default class AutoCompleteListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.extractValidText = this.extractValidText.bind(this);
		this.getWords = this.getWords.bind(this);
		this.getNext = this.getNext.bind(this);
		this.getNewWords = this.getNewWords.bind(this);
		this.state = {
			...INITIAL_STATE,
			text: this.props.text
		};
	}

	extractValidText(text) {
		const reg = /[가-힣]/g;
		let match = reg.exec(text);
		let validText = "";

		while (match) {
			validText += match[0];
			match = reg.exec(text);
		}
		return validText;
	}

	getWords(next, callback) {
		const trace = this.state.text;

		this.setState({ pending: true });
		fetchWords({ text: trace, next })
			.then(res => {
				this.setState({ pending: false });
				if (res.status === 200) {
					if (this.state.text !== trace)
						return ;
					callback(res.data);
					return ;
				}
				console.error(FAIL_MESSAGE);
			})
			.catch(err => {
				this.setState({ pending: false });
				console.error(err);
			})
	}

	getNext() {
		if (this.state.next === null)
			return ;
		this.getWords(this.state.next, ({ words, next }) => {
			this.setState({
				words: [ ...this.state.words, ...words ],
				next
			});
		});
	}

	getNewWords() {
		this.getWords(null, ({ words, next }) => {
			this.setState({ words, next });
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.text === this.props.text)
			return ;
		const validText = this.extractValidText(this.props.text);

		if (validText === this.state.text)
			return ;
		else if (validText === "")
			this.setState({ ...INITIAL_STATE });
		else
			this.setState({ text: validText }, () => {
				this.getNewWords();
			});
	}

	render() {
		const { words, pending } = this.state;
		const { visible, setText } = this.props;

		return (
			<AutoCompleteList
				words={ words }
				visible={ visible }
				pending={ pending }
				getNext={ this.getNext }
				setText={ setText }
			/>
		);
	}
}

AutoCompleteListContainer.propTypes = {
	text: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	setText: PropTypes.func.isRequired,
}