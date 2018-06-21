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
httpProxy.createProxyServer({target:'http://dminutezuul.herokuapp.com'});
console.log("LOG: proxy creado");
//httpProxy.createProxyServer({target:'http://dminutezuul.herokuapp.com'}).listen(port);

const server = http.createServer(app);
console.log("LOG: server creado");
app.listen(port, () => console.log("App now running on port", port));
httpProxy.listen(port);