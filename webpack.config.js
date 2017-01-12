
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
        'app.prod': './app/app.js',
		'install.prod': './app/install/install.js'
    },
	output: {
		path: './app/wpk',
		filename: '[name].js'
	},
	plugins: [
		new ExtractTextPlugin('[name].css')
    ],
	module: {
		loaders: [
			{test: /\.js$/, loaders: ['ng-annotate']},
			{test: /\.css$/, loader: ExtractTextPlugin.extract(['css?sourceMap'])},
			{test: /\.scss$/, loader: ExtractTextPlugin.extract(['css?sourceMap', 'sass?sourceMap'])},
			// css-loader use file-loader and url-loader to require the fonts.
			{test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
			{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
			// managing angular templates into javascript file.
			{test: /\.html$/, loader: 'ngtemplate?relativeTo=app!html?attrs=false'}

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
	},
	resolve: {
		extensions: ['', '.js'],
		alias: {
			'load-image': 'blueimp-load-image/js/load-image.js',
			'load-image-meta': 'blueimp-load-image/js/load-image-meta.js',
			'load-image-exif': 'blueimp-load-image/js/load-image-exif.js',
			'canvas-to-blob': 'blueimp-canvas-to-blob/js/canvas-to-blob.js',
			'jquery-ui/ui/widget': 'blueimp-file-upload/js/vendor/jquery.ui.widget.js'
		}
	}
};
