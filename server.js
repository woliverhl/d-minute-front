//Install express server
const express = require('express'),
    app = express(),
    cors = require('cors');

const configUndefined = function (req, res, next) {
    if (!req.headers.origin) {
        express.static(__dirname + '/dist')
    } else {
        next();
    }
}

const configCors = {
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

// Serve only the static files form the dist directory
app.use(configUndefined, cors(configCors));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);