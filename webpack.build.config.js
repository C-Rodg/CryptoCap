const webpack = require("webpack"),
	path = require("path"),
	HtmlWebpackPlugin = require("html-webpack-plugin"),
	BabiliPlugin = require("babili-webpack-plugin"),
	ExtractTextPlugin = require("extract-text-webpack-plugin");

const SRC_DIR = path.resolve(__dirname, "src");
const OUTPUT_DIR = path.resolve(__dirname, "dist");
