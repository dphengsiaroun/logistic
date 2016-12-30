var express = require('express');
var serveIndex = require('serve-index');
var proxy = require('express-http-proxy');

var app = express();

var port = 8000;

app.use('/app/ws', proxy('http://localhost:8888', {
    forwardPath: function(req, res) {
        var path = require('url').parse(req.url).path;
        path = '/logistic/app/ws' + path;
        console.log('path', path);
        return path;
    }
}));

app.use(express.static('.'));
app.use(serveIndex('.', {icons: true}));


app.use(function(req, res, next) {
	console.log('404: Page not Found', req.url);
	next();
});

app.listen(port, function() {
	console.log('server started on port ' + port);
});
