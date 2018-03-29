//Install express server
const express = require('express'),
    cors = require('cors')
    app = express();

    // hard coded configuration object
    conf = {
        // look for PORT environment variable,
        // else look for CLI argument,
        // else use hard coded value for port 8080
        port: process.env.PORT || process.argv[2] || 8080,
    originUndefined: function (req, res, next) {
        if (!req.headers.origin) {
            res.json({
                mess: 'Hi you are visiting the service locally. If this was a CORS the origin header should not be undefined'
            });
        } else {
            next();
        }

    },

    // Cross Origin Resource Sharing Options
    cors: {
        // origin handler
        origin: function (origin, cb) {
            // setup a white list
            let wl = ['https://dminutems.herokuapp.com'];
            if (wl.indexOf(origin) != -1) {
                cb(null, true);
            } else {
                cb(new Error('invalid origin: ' + origin), false);
            }
        },
        optionsSuccessStatus: 200
    }

};

// use origin undefined handler, then cors for all paths
app.use(conf.originUndefined, cors(conf.cors));

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port
app.listen(conf.port, function () {
    console.log('CORS-enabled JSON service is live on port: ' + conf.port);
});