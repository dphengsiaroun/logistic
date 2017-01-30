var express = require('express');
var serveIndex = require('serve-index');
var httpProxy = require('http-proxy');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var webpackDevMiddleware = require('webpack-dev-middleware');
var environments = require('./cfg/environments.js');
var cfgUtils = require('./cfg/utils.js');
var env = cfgUtils.getEnv('dev');
var port = 8000;


var proxyUrl = env.proxyUrl;

var app = express();


// http proxy
var apiProxy = httpProxy.createProxyServer();
var jlgProxy = function(req, res, next) {
	apiProxy.web(req, res, {target: proxyUrl});
};

webpackConfig.output.path = '/';
var compiler = webpack(webpackConfig);
app.use('/app/wpk/', webpackDevMiddleware(compiler, {}));

app.use(function(req, res, next) {
	console.log('req.url', req.url);
	next();
});

app.use(['/app/ws', '/dist/ws'], jlgProxy);

app.use(express.static('.'));
app.use('/dist/files', express.static('./app/files'));
app.use(serveIndex('.', {icons: true}));


app.use(function(req, res, next) {
	console.log('404: Page not Found', req.url);
	next();
});

app.listen(port, function() {
	console.log('server started on port ' + port);
});
