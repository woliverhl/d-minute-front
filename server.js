var express = require('express');
var path = require('path');
var cors = require('cors')
var http = require('http'),
    httpProxy = require('http-proxy');

var app = express();
app.set('views', path.join(__dirname, 'src'));
app.use(express.static(__dirname + '/dist'));

var proxy = httpProxy.createProxyServer({});    
httpProxy.createProxyServer({
    target:'http://dminutezuul.herokuapp.com'  
  }).listen(process.env.PORT);

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});