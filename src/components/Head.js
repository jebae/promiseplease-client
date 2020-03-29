import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

export default function Head(props) {
	const { title, description, keywords, image } = props;

	return (
		<Helmet>
			<title>{ title }</title>
			<meta charset="UTF-8"/>
			<meta name="description" content={ description }/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			{
				(keywords)
				? <meta name="keywords" content={ keywords.join(",") }/>
				: null
			}
			<meta property="og:title" content={ title }/>
			<meta property="og:description" content={ description }/>
			{
				(image)
				? <meta property="og:image" content={ image }/>
				: null
			}
		</Helmet>
	);
}

Head.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	keywords: PropTypes.array,
	image: PropTypes.string,
}