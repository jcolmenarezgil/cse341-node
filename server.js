// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./database');
const passport = require('passport');
const session = require('express-session');
const GitHubStategy = require('passport-github2').Strategy;
const cors = require("cors");

// app port
const app = express();
const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    // Basic express session initialization
    .use(passport.initialize())
    // init passport on every route call.
    .use(passport.session())
    // allow passport to use "express-session"
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "POST, GET, PUT, PATCH, OPTIONS, DELETE"
        );
        next();
    })
    .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
    .use(cors({ origin: '*' }))
    .use("/", require("./routes/index.js"));

passport.use(new GitHubStategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        //User.findOrCreate({ githubId: profile.id}, function (err, user) {
        return done(null, profile);
        //});
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out") });

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

// mondodb init
mongodb.initDb((err) => {
    if (err) {
        console.error('Error connecting to database', err);
    } else {
        app.listen(port, () => { console.log(`Database is listening and node server is Running on port ${port}`) });
    }
})

process.on('uncaughtException', (err, origin) => {
    console.error(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
})

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;

    console.error(`Error ${statusCode}:`, err.message);

    res.status(statusCode).json({
        message: statusCode === 500
            ? 'Internal Server Error'
            : err.message || 'Failured to process request'
    });
});