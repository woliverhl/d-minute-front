const express = require('express');
const path = require('path');
const http = require('http');
const httpProxy = require('http-proxy');

//Creando el servidor
const app = express();
app.use(express.static(__dirname + '/dist'));
app.set('views', path.join(__dirname, 'src'));

//Define puerto
const port = process.env.PORT || '8080';
app.set(port);

// Create a proxy server with custom application logic
const proxy = httpProxy.createProxyServer({});
proxy.web(req, res, { target: 'http://dminutezuul.herokuapp.com' });

const server = http.createServer(app);

app.listen(port, () => console.log("App now running on port", port));