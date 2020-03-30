import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

export default function Head(props) {
	const { url, title, description, keywords, image } = props;

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
			<meta property="og:url" content={ url }/>
			<meta property="og:title" content={ title }/>
			<meta property="og:description" content={ description }/>
			{
				(image)
				? <meta property="og:image" content={ image }/>
				: null
			}
			<meta property="og:type" content="website"/>
		</Helmet>
	);
}

Head.propTypes = {
	url: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	keywords: PropTypes.array,
	image: PropTypes.string,
}