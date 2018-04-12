const express = require('express');
const app = express();
const cors = require('cors')
const history = require('connect-history-api-fallback');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use(allowCrossDomain);
app.use(history());
app.options('*', cors());
app.use(cors());
app.use(express.static(__dirname + '/dist'));

app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), () => {
  console.log(`Server launched on ${process.env.port || 8080}`);
});