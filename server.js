const express = require('express');
const app = express();
const mongodb = require('./database');
const port = process.env.PORT || 3000;

// app routes
app.use('/', require('./routes'));

// mondodb init
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => { console.log(`Database is listening and node server is Running on port ${port}`) });
    }
})