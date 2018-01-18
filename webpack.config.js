const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		bundle: './app/main.module.js',
		vendors: './app/vendors.js',
		install: './app/install/install.module.js',
		admin: './app/admin/admin.module.js'	
	},
	output: {
		path: path.resolve(__dirname, './app/wpk'),
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: ['ng-annotate-loader', 'babel-loader']
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						minimize: true,
						sourceMap: true
					}
				}]
			})
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader',
					options: {
						minimize: true,
						sourceMap: true
					}
				}, {
					loader: 'postcss-loader',
					options: {
						sourceMap: true
					}
				}, {
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}]
			})
		}, {
			test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
			use: 'url-loader?limit=10000&mimetype=application/font-woff'
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			use: 'url-loader?limit=10000&mimetype=application/octet-stream'
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			use: 'file-loader'
		}, {
			test: /fontawesome-webfont\.svg(\?v=\d+\.\d+\.\d+)?$/,
			use: 'url-loader?limit=10000&mimetype=image/svg+xml'
		}, {
			test: /\.html$/,
			use: [{
				loader: 'html-loader',
				options: {
					attrs: 'img-svg:src',
					root: path.resolve('./app'),
					minimize: true
				}
			}]
		}, {
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
					attrs: false,
					minimize: true
				}
			}]
		}, {
			test: /\.(png|jpg)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192
				}
			}],
		}]
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: ['vendors']
		}),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false,
		//		drop_console: true
		// 	},
		// 	output: {
		// 		comments: false,
		// 	}
		// })
	],
	devtool: 'source-map',
	resolve: {
		extensions: ['.js'],
	}
};
