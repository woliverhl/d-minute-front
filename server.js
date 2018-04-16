var express = require('express');
var path = require('path');
var cors = require('cors')

var app = express();
app.set('views', path.join(__dirname, 'src'));
app.use(express.static(__dirname + '/dist'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin: *');
  res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
  next();
});

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});