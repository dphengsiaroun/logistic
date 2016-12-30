
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
        'app.prod': './app/app.js'
    },
	output: {
		path: './wpk',
		filename: '[name].js'
	},
	plugins: [
		new ExtractTextPlugin('[name].css')
    ],
	module: {
		loaders: [
			{test: /\.js$/, loaders: ['ng-annotate']},
			{test: /\.css$/, loader: ExtractTextPlugin.extract(['css?sourceMap'])},
			// css-loader use file-loader and url-loader to require the fonts.
			{test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
			// managing angular templates into javascript file.
			{test: /\.html$/, loader: 'ngtemplate?relativeTo=app!html'}

		]
    },
	devtool: 'source-map',
	setupProd: function() {
		// console.log('setupProd', this);
		this.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            }
        }));
	}
};