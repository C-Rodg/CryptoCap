const webpack = require("webpack"),
	path = require("path"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	BabiliPlugin = require("babili-webpack-plugin"),
	ExtractTextPlugin = require("extract-text-webpack-plugin");

const SRC_DIR = path.resolve(__dirname, "src");
const OUTPUT_DIR = path.resolve(__dirname, "dist");

const defaultInclude = [SRC_DIR];

module.exports = {
	entry: SRC_DIR + "/index.js",
	output: {
		path: OUTPUT_DIR,
		publicPath: "./",
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				}),
				include: defaultInclude
			},
			{
				test: /\.jsx?$/,
				use: [{ loader: "babel-loader" }],
				include: defaultInclude
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				use: [{ loader: "file-loader?name=img/[name]__[hash:base64:5].[ext]" }],
				include: defaultInclude
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
					{ loader: "file-loader?name=font/[name]__[hash:base64:5].[ext]" }
				],
				include: defaultInclude
			}
		]
	},
	target: "electron-renderer",
	plugins: [
		new HtmlWebpackPlugin({
			favicon: "./src/static/favicon.ico",
			title: "CryptoCap"
		}),
		new ExtractTextPlugin("bundle.css"),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production")
		}),
		new BabiliPlugin()
	],
	stats: {
		colors: true,
		children: false,
		chunks: false,
		modules: false
	}
};
