// const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'ng-annotate-loader',
				}, {
					loader: 'babel-loader',
				}]
			},
			{
				enforce: 'post',
				test: /\.js$/,
				loader: 'istanbul-instrumenter-loader',
				exclude: [/(node_modules)/, /test\/unit\/*\.js/],
			},
			{
				test: /\.s?css$/,
				use: 'null-loader'
			},
			// managing angular templates into javascript file.
			{
				test: /\.html$/,
				use: 'null-loader'
			},
		]
	},
	devtool: 'inline-source-map',
};
