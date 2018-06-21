'use strict'

const express = require('express');
const request = require('request');

let proxyConfig = {
    url : {
        base: 'https://dminuteapi.herokuapp.com',
    }
}

/* setting up and configuring node express server for the application */
let server = express();

server.use(express.static(__dirname + '/dist'));
server.set('views', path.join(__dirname, 'src'));
//Define puerto
const port = process.env.PORT || '8080';
server.set(port);

/* methods forwarded to the servertoreach proxy  */
server.use('/somethingElse', function(req, res)
{
    let url = proxyConfig.url.base + req.query.id;
    req.pipe(request(url)).pipe(res);
});

/* start the server */
server.listen(server.get('port'), function() {
    console.log('express server with a proxy listening on port ' + server.get('port'));
});

/*
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');

//Creando el servidor
const app = express();
app.use(express.static(__dirname + '/dist'));
app.set('views', path.join(__dirname, 'src'));
app.use(cors());

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

console.log("LOG: app creado");

//Define puerto
const port = process.env.PORT || '8080';
app.set(port);
console.log("LOG: puerto seteado");

const server = http.createServer(app);
console.log("LOG: server creado");
server.listen(port, () => console.log("App now running on port", port));
*/