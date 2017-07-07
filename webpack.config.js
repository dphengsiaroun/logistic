// const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		'app.prod': './app/app.js',
		'install.prod': './app/install/install.js'
	},
	output: {
		path: path.resolve(__dirname, './app/wpk'),
		filename: '[name].js'
	},
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
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader?minimize&sourceMap'
				})
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader?minimize&sourceMap!sass-loader?sourceMap'
				})
			},
			// css-loader use file-loader and url-loader to require the fonts.
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				use: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				use: 'url-loader?limit=10000&mimetype=application/octet-stream'
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				use: 'file-loader'
			},
			{
				test: /fontawesome-webfont\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: 'url-loader?limit=10000&mimetype=image/svg+xml'
			},
			// managing angular templates into javascript file.
			{
				test: /\.html$/,
				use: [{
					loader: 'ngtemplate-loader',
					options: {
						relativeTo: 'app'
					}
				}, {
					loader: 'html-loader',
					options: {
						attrs: 'img-svg:src',
						root: path.resolve('./app')
					}
				}]
			},
			{
				test: /\.svg/,
				exclude: /fontawesome-webfont/,
				use: [{
					loader: 'ngtemplate-loader',
					options: {
						relativeTo: 'app'
					}
				}, {
					loader: 'html-loader',
					options: {
						attrs: false
					}
				}]
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		// 	},
		// 	output: {
		// 		comments: false,
		// 	}
		// })
	],
	devtool: 'source-map',
	resolve: {
		extensions: ['.js'],
		alias: {
			'load-image': 'blueimp-load-image/js/load-image.js',
			'load-image-meta': 'blueimp-load-image/js/load-image-meta.js',
			'load-image-exif': 'blueimp-load-image/js/load-image-exif.js',
			'canvas-to-blob': 'blueimp-canvas-to-blob/js/canvas-to-blob.js',
			'jquery-ui/ui/widget': 'blueimp-file-upload/js/vendor/jquery.ui.widget.js',
		}
	}
};
