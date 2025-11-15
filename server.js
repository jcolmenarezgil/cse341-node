const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database');
const app = express();

// app port
const port = process.env.PORT || 3000;
// app routes
app.use(bodyParser.json());
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
})

// mondodb init
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => { console.log(`Database is listening and node server is Running on port ${port}`) });
    }
})