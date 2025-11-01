// express web server 
var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = 3000;

app.listen(process.env.PORT || port);
console.log('Web server is listening at port ' + (process.env.PORT || port));