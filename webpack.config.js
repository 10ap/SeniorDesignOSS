const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	entry: {
		content: "./src/frontend/index.js",
		background: "./src/backend/service-worker.js",
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "build"),
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/public/index.html",
			chunks: ["content"],
		}),
		new webpack.ProvidePlugin({
			browser: "webextension-polyfill",
		}),
	],
	devtool: "cheap-module-source-map",
};
