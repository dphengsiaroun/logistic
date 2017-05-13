const express = require('express');
const serveIndex = require('serve-index');
const httpProxy = require('http-proxy');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const cfgUtils = require('./cfg/utils.js');
const env = cfgUtils.getEnv('dev');
const port = 8000;


const proxyUrl = env.proxyUrl;

const app = express();


// http proxy
const apiProxy = httpProxy.createProxyServer();
const jlgProxy = function(req, res, next) {
	apiProxy.web(req, res, {
		target: proxyUrl
	});
};

webpackConfig.output.path = '/';
const compiler = webpack(webpackConfig);
app.use('/app/wpk/', webpackDevMiddleware(compiler, {}));

app.use(function(req, res, next) {
	console.log('req.url', req.url);
	next();
});

app.use(['/app/ws', '/dist/ws'], jlgProxy);

app.use(express.static('.'));
app.use('/dist/files', express.static('./app/files'));
app.use(serveIndex('.', {
	icons: true
}));

app.use('/app/', function(req, res, next) {
	console.log('Url rewriting: req.url', req.url);
	if (req.url.match(/app\/files/)) {
		next();
	}
	res.sendFile('./app/index.html', {root: __dirname});
});

app.use('/dist/', function(req, res, next) {
	console.log('Url rewriting: req.url', req.url);
	if (req.url.match(/dist\/files/)) {
		next();
	}
	res.sendFile('./dist/index.html', {root: __dirname});
});


app.use(function(req, res, next) {
	console.log('404: Page not Found', req.url);
	next();
});

app.listen(port, function() {
	console.log('server started on port ' + port);
});
