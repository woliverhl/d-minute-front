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
        cb(null, true);
        optionsSuccessStatus: 200
    }
}

// Serve only the static files form the dist directory
app.use(configUndefined, cors(configCors));

app.listen(process.env.PORT || 8080, (port) => {
    console.log(`we are running on port ${process.env.PORT}`);
});