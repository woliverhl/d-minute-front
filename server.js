var express = require('express');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
var upload = multer();

app.set('views', path.join(__dirname, 'src'));
app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const api_path = '/api';

const host = 'http://172.17.0.3:3333';

app.post(api_path + '/*', upload.array(), function(req, res) {

	console.log("============ POST =================");
	console.log("url: " + req.url);
	console.log("headers: " + JSON.stringify(req.headers));
	console.log("params: " + JSON.stringify(req.params));
	console.log("body: " + JSON.stringify(req.body));
	console.log("============ POST =================");

  	let options = {
    	path:   req.url.replace(api_path, ''),
    	method: 'POST',
    	headers: {
    		'Authorization': req.headers.authorization
    	},

    	body: req.body
  	};

  	console.log('options: ' + JSON.stringify(options));

  	request({
  		method: options.method,
  		uri: host + options.path,
  		json: true,
  		headers: options.headers,
  		body: options.body
  	}, function(error, response, body){
  		console.log('error: ' + error);
  		console.log('response' + JSON.stringify(response));
  	}).pipe(res);
});

app.get(api_path + '/*', function(req, res) {
	console.log("============ REQUEST =================");
	console.log("============ GET =================");
	console.log("url: " + req.url);
	console.log("headers: " + JSON.stringify(req.headers));
	console.log("params: " + JSON.stringify(req.params));
	console.log("============ GET =================");

  	let options = {
    	path:   req.url.replace(api_path, ''),
    	headers: {
    		'Authorization': req.headers.authorization
    	}
 	};

 	console.log("options: " + JSON.stringify(options));

 	request({
 		url: host + options.path,
 		headers: options.headers,
 	}, function(error, response, body){
  		console.log('error: ' + error);
  		console.log('response: ' + JSON.stringify(response));
  		console.log('body: ' + JSON.stringify(body));
  	})
 	.pipe(res);
 	console.log("============ END REQUEST =================");
});


var server = app.listen(process.env.PORT || 8180, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});