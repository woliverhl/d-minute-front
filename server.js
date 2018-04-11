//Install express server
const express = require('express'),
     path = require('path'),
     cors = require('cors');

const app = express();

app.options('*', cors());
app.use(cors());
app.set('views', path.join(__dirname, 'src'));
app.use(express.static(__dirname + '/dist'));

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
    });