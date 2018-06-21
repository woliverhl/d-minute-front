const express = require('express');
const path = require('path');
const http = require('http');
const httpProxy = require('http-proxy');

//Creando el servidor
const app = express();
app.use(express.static(__dirname + '/dist'));
app.set('views', path.join(__dirname, 'src'));

console.log("LOG: app creado");

//Define puerto
const port = process.env.PORT || '8080';
app.set(port);
console.log("LOG: puerto seteado");

// Create a proxy server with custom application logic
var proxy = httpProxy.createProxyServer({});
console.log("LOG: proxy creado");



app.listen = function(){
  var server = http.createServer(function(req, res) {
    proxy.web(req, res, { target: 'http://dminutezuul.herokuapp.com' });
  });  
  return server.listen.apply(server, arguments);
};



//const server = http.createServer(app);
console.log("LOG: server creado");
/*
server.set(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  proxy.web(req, res, { target: 'http://dminutezuul.herokuapp.com' });
});
*/
//server.listen(port, () => console.log("App now running on port", port));