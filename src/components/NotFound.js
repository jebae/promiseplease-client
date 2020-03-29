import React from "react";
import PropTypes from "prop-types";

export default function NotFound({ staticContext={} }) {
	staticContext.status = 404;
	return (
		<h1 className="NotFound">404 Not Found :(</h1>
	);
}

NotFound.propTypes = {
	staticContext: PropTypes.object,
}