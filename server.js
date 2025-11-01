// express web server 
var express = require('express');
var app = express();
const routerLesso1 = require('./controller/lesson1') 

app.get('/', routerLesso1.mainRoute);
app.get('/info', routerLesso1.infoRoute);

const port = 3000;

app.listen(process.env.PORT || port);
console.log('Web server is listening at port ' + (process.env.PORT || port));