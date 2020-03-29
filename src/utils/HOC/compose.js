const compose = (...hocs) => (Component) => {
	return [ ...hocs ].reverse()
		.reduce((acc, cur) => cur(acc), Component);
}

export default compose;