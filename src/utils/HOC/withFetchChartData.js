import React from "react";
import PropTypes from "prop-types";

const INITIAL_STATE = {
	data: {},
	fail: false,
}

const FETCH_FAIL_MESSAGE = "데이터를 불러오는데 실패했습니다";

const withFetchChartData = ({ fetch }) => (Component) => {
	class WithFetchChartData extends React.Component {
		constructor(props) {
			super(props);
			this.state = { ...INITIAL_STATE };
		}

		componentDidMount() {
			fetch()
				.then(res => {
					if (res.status === 200) {
						this.setState({ data: res.data }, () => {
							this.props.fetchCountUp();
						});
						return ;
					}
					this.setState({ fail: true }, () => {
						this.props.fetchCountUp();
					});
				})
				.catch(err => {
					this.setState({ fail: true }, () => {
						this.props.fetchCountUp();
					});
				});
		}

		getKeys(data, excludes) {
			const keys = data.reduce((acc, cur) => {
				for (let key of Object.keys(cur))
					acc.add(key);
				return acc;
			}, new Set());
	
			for (let ex of excludes)
				keys.delete(ex);
			return keys;
		}

		render() {
			const { data, fail } = this.state;

			if (fail) {
				return null;
			} else {
				return (
					<Component
						{ ...this.props }
						data={ data }
						getKeys={ this.getKeys }
					/>
				);
			}
		}
	}
	WithFetchChartData.propTypes = {
		fetchCountUp: PropTypes.func.isRequired,
	}
	WithFetchChartData.WrappedComponent = Component;
	return WithFetchChartData;
}

export default withFetchChartData;