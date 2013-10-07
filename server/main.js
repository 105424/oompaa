var express = require('express');
var app = express();
var api = require('./api');
var data = require('./data');

var port = 2001;

app.use(express.bodyParser());

api.init({'port':port,'app':app,'data':data});