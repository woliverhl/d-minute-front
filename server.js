var express = require('express');
var path = require('path');
var cors = require('cors')

var app = express();
app.set('views', path.join(__dirname, 'src'));
app.use(express.static(__dirname + '/dist'));

var corsOptions = {
  origin: 'http://dminutezuul.herokuapp.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});