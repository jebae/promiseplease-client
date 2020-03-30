const path = require("path");
const webpack = require("webpack");
const DotEnv = require("dotenv-webpack");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					"babel-loader",
					{
						loader: path.resolve("./.test_utils/inject-constructor-loader.js")
					}
				]
			},
			{
				test: /\.scss$/,
				include: path.resolve("./src/stylesheets"),
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(png|jpg|svg)$/,
				use: {
					loader: "file-loader"
				}
			},
		]
	},
	plugins: [
		new DotEnv(),
	],
}