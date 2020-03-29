const merge = require("webpack-merge");
const base = require("./webpack.config.base");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge.strategy({
	plugins: "append",
	"module.rules": "append",
})(base, {
	mode: "production",
	optimization: {
		minimizer: [
			new TerserJSPlugin({}),
			new OptimizeCssAssetsPlugin({}),
		]
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[hash].css",
		}),
		new CopyWebpackPlugin([
			{ from: "./src/robots.txt", to: "./" }
		]),
	],
});