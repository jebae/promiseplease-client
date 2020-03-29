import React from "react";
import countUp from "../countUpAnimation";

const INITIAL_STATE = {
	propName: null,
	duration: 5000,
	counter: 0
};

const withCountUpInnerText = ({ propName, duration }) => (Component) => {
	class WithCountUpInnerText extends React.Component {
		constructor(props) {
			super(props);
			this.changeDomText = this.changeDomText.bind(this);
			this.checkCancel = this.checkCancel.bind(this);
			this.handleChange = this.handleChange.bind(this);
			this.refToForward = React.createRef();
			this.state = {
				propName,
				duration: duration ? duration : INITIAL_STATE.duration,
				counter: INITIAL_STATE.counter
			};
		}

		changeDomText(value) {
			if (!this.refToForward.current)
				return false;
			this.refToForward.current.innerText = value;
			return true;
		}

		checkCancel() {
			const counter = this.state.counter;

			return () => (this.state.counter !== counter);
		}

		handleChange(prevProps) {
			const { duration, propName } = this.state;

			if (this.props[propName] !== 0 &&
				(prevProps === null || (prevProps[propName] !== this.props[propName]))) {
				this.setState({ counter: this.state.counter + 1 }, () => {
					countUp(
						this.props[propName],
						duration,
						this.changeDomText,
						this.checkCancel()
					);
				});
			}
		}

		componentDidMount() {
			this.handleChange(null);
		}

		componentDidUpdate(prevProps) {
			this.handleChange(prevProps);
		}

		render() {
			return (
				<Component
					{ ...this.props }
					ref={ this.refToForward }
				/>
			);
		}
	}
	WithCountUpInnerText.WrappedComponent = Component;
	return WithCountUpInnerText;
}

export default withCountUpInnerText;