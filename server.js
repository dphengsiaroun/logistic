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

// mobile console log
// const multer = require('multer');
// const mobileConsole = require('mobile-console-log/mobile-console-middleware.js');
// app.post('/mobile-console-log', multer().fields([]), mobileConsole);
// end Mobile console log

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
	
	next();
});

app.use(['/app/ws', '/dist/ws'], jlgProxy);

app.use(express.static('.'));
app.use('/dist/files', express.static('./app/files'));
app.use(serveIndex('.', {
	icons: true
}));

app.use('/app/', function(req, res, next) {
	
	if (req.url.match(/app\/files/)) {
		next();
	}
	res.sendFile('./app/index.html', {root: __dirname});
});

app.use('/dist/', function(req, res, next) {
	
	if (req.url.match(/dist\/files/)) {
		next();
	}
	res.sendFile('./dist/index.html', {root: __dirname});
});


app.use(function(req, res, next) {
	
	next();
});

app.listen(port, function() {
	
});
