import React from "react";
import path from "path";
import fs from "fs";
import express from "express";
import ReactDomServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Helmet from "react-helmet";
import App from "../src/app";

const PORT = process.env.PORT;
const app = express();

app.use(express.static("./dist", { index: false }));
app.get("/*", (req, res) => {
	const context = {};
	const appString = ReactDomServer.renderToString(
		<StaticRouter location={ req.url } context={ context }>
			<App/>
		</StaticRouter>
	);
	const helmet = Helmet.renderStatic();
	const html = path.resolve("./dist/index.html");
	fs.readFile(html, "utf8", (err, data) => {
		if (err) {
			console.error(err);
			return res.status(500).send();
		}
		if (context.status === 404) {
			res.status(404);
		}
		const head = /<head>(.*)<\/head>/.exec(data)[1];
		return res.send(
			data
				.replace(
					/<head>.*<\/head>/,
					`<head>
						${helmet.title.toString()}
						${helmet.meta.toString()}
						${head}
					</head>`
				)
				.replace(
					'<div id="root"></div>',
					`<div id="root">${ appString }</div>`
				)
		);
	});
});

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});