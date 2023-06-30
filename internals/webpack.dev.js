global.withAppBuild = true

let commonConfig = require('./webpack.common.js')
let webpack = require("webpack");
let path = require("path");
let WriteFilePlugin = require('write-file-webpack-plugin');

process.env.NODE_ENV = "development"

//Plugins
let plugins = commonConfig.plugins.concat([
	new webpack.DefinePlugin({
		__DEV__: JSON.stringify(true),
		__PLATFORM__: JSON.stringify(global.platform||"chrome"),
		__APPBUILD__: JSON.stringify(global.withAppBuild||false),
		__APPBUILD_LOCAL__: JSON.stringify(global.appBuildLocal||false)
	}),
	new WriteFilePlugin(),
])

let loaders = commonConfig.loaders;

let isHttps = global.unsecure ? false : true;
let protocol = (isHttps ? "https" : "http"),
	port = (isHttps ? 443 : 80);

module.exports = require('./webpack.js')({
	devtool: "cheap-module-eval-source-map",
	debug: true,
	https: isHttps,

	publicPath: protocol+"://localhost:"+port+"/",
	devServer: {
		publicPath: protocol+"://localhost:"+port+"/",
		outputPath: path.join(__dirname, "../build/chrome"),
		https: isHttps
	}
}, plugins, loaders)
