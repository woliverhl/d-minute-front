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


app.post('/api/*', upload.array(), function(req, res) {

	console.log("url: " + req.url);
	console.log("headers: " + JSON.stringify(req.headers));
	console.log("params: " + JSON.stringify(req.params));
	console.log("body: " + JSON.stringify(req.body));

  	var options = {
    	// host to forward to
    	//host:   'http://localhost',
    	host:   'https://dminuteapi.herokuapp.com',
    	// port to forward to
    	port:   80,
    	// path to forward to
    	path:   req.url.replace('/api', ''),
    	// request method
    	method: 'POST',
    	// headers to send
    	headers: {
    		'content-type': req['content-type']
    	},

    	body: req.body
  	};

  	console.log('options: ' + JSON.stringify(options));

  	request({
  		method: options.method,
  		uri: options.host + options.path,
  		json: true,
  		headers: [
  			{
  				name: 'content-type',
  				value: 'application/json'
  			}
  		],
  		body: options.body
  	}, function(error, response, body){
  		console.log('error: ' + error);
  		console.log('response' + JSON.stringify(response));
  	}).pipe(res);

  	//res.end();

  //console.log(req);

  /*var creq = http.request(options, function(cres) {

    // set encoding
    cres.setEncoding('utf8');

    // wait for data
    cres.on('data', function(chunk){
      res.write(chunk);
    });

    cres.on('close', function(){
      // closed, let's end client request as well 
      res.writeHead(cres.statusCode);
      res.end();
    });

    cres.on('end', function(){
      // finished, let's finish client request as well 
      res.writeHead(cres.statusCode);
      res.end();
    });

  }).on('error', function(e) {
    // we got an error, return 500 error to client and log error
    console.log(e.message);
    res.writeHead(500);
    res.end();
  });

  creq.end();*/

});


var server = app.listen(process.env.PORT || 8180, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});