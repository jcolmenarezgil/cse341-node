var express = require('express');
var mongodb = require('./database');
var app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => { console.log(`Database is listening and node server is Running on port ${port}`) });
    }
});
