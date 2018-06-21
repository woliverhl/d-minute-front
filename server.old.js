var express = require('express');
var path = require('path');
var cors = require('cors')

var app = express();
app.set('views', path.join(__dirname, 'src'));
app.use(express.static(__dirname + '/dist'));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://dminutems.herokuapp.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
    console.log("App now running on ip", server.address());
});