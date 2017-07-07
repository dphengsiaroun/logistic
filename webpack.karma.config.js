// const webpack = require('webpack');
const path = require('path');

module.exports = {
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
				}]
			}, {
				enforce: 'post',
				test: /\.js$/,
				loader: 'istanbul-instrumenter-loader',
				query: {
					esModules: true
				},
				exclude: [/node_modules/, /test.*unit.*\.js$/],
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
