// express web server 
var express = require('express');
var app = express();

const port = 3000;

app.use('/', require('./routes'));

app.listen(process.env.PORT || port);
console.log('Web server is listening at port ' + (process.env.PORT || port));