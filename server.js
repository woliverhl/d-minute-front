var express = require('express');
var path = require('path');
var http = require('http'),
    httpProxy = require('http-proxy');

var app = express();
app.set('views', path.join(__dirname, 'src'));
app.use(express.static(__dirname + '/dist'));

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});
//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, { target: 'http://dminutezuul.herokuapp.com' });
});