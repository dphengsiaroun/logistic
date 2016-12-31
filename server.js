var express = require('express');
var serveIndex = require('serve-index');
var httpProxy = require('http-proxy');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var webpackDevMiddleware = require('webpack-dev-middleware');
var port = 8000;
var proxyUrl = 'http://localhost:8888';
try {
	var config = require('./config.json.log');
	proxyUrl = config.proxyUrl;
} catch(e) {
	console.log('no config.json.log', e);
}
console.log('proxyUrl', proxyUrl);
var app = express();


// http proxy
var apiProxy = httpProxy.createProxyServer();
var jlgProxy = function(req, res, next) {
	apiProxy.web(req, res, {target: proxyUrl});
}



webpackConfig.output.path = '/';
var compiler = webpack(webpackConfig);
app.use('/wpk/', webpackDevMiddleware(compiler, {}));

app.use('/app/ws', jlgProxy);

app.use(express.static('.'));
app.use(serveIndex('.', {icons: true}));


app.use(function(req, res, next) {
	console.log('404: Page not Found', req.url);
	next();
});

app.listen(port, function() {
	console.log('server started on port ' + port);
});
