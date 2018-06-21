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
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
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