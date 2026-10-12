// Imports and initial setup
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const dotenv = require('dotenv').config();

// Port configuration
const port = process.env.PORT || 3000;

// App setup
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: '*',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Z-Key', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Routes
app.use('/', require('./routes/index'));

// GitHub OAuth strategy setup for Passport.js
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

// Passport.js serialization and deserialization setup
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Routes for handling GitHub OAuth login and callback
app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : "Logged out");
});
app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api-docs', session: false }), (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

// Handle uncaught exceptions
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// Export the app for supertest
module.exports = app;

// Initialize database and start server
if (require.main === module) {
    mongodb.initDb((err) => {
        if (err) {
            console.log(err);
        } else {
            app.listen(port, () => { console.log(`Database is listening and node Running on port ${port}`); });
        }
    });
}