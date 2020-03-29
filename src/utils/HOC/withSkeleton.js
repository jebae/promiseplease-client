import React from "react";
import PropTypes from "prop-types";

const INITIAL_STATE = {
	count: 0
}

const withSkeleton = ({ Skeleton, fetchCount }) => (Component) => {
	class WithSkeleton extends React.Component {
		constructor(props) {
			super(props);
			this.countUp = this.countUp.bind(this);
			this.countInit = this.countInit.bind(this);
			this.state = { ...INITIAL_STATE };
		}

		countUp() {
			this.setState({ count: this.state.count + 1 });
		}

		countInit() {
			this.setState({ count: 0 });
		}

		render() {
			const fetchComplete = this.state.count >= fetchCount;

			return (
				<div>
					{ (fetchComplete) ? null : <Skeleton/> }
					<div className={ fetchComplete ? "" : "hidden" }>
						<Component
							{ ...this.props }
							fetchCountUp={ this.countUp }
							fetchCountInit={ this.countInit }
						/>
					</div>
				</div>
			);
		}
	}
	WithSkeleton.WrappedComponent = Component;
	return WithSkeleton;
}

export default withSkeleton;