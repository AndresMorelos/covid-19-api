const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const routes = require('./routes');

const app = express();

//Security protection
app.use(helmet());

// Using GZIP responses compression 
app.use(compression());

// Parsing the body requests with body-parser library.
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Load API routes
app.use('/', routes);


module.exports = app;