const merge = require("webpack-merge");
const base = require("./webpack.config.base");

module.exports = merge.strategy({
	"module.rules": "append",
})(base, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		contentBase: "./dist",
		historyApiFallback: {
			index: "/",
		},
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
});