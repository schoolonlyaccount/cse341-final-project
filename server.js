// Imports and initial setup
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
//const passport = require('passport');
//const session = require('express-session');
//const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const dotenv = require('dotenv').config();

// Port configuration
const port = process.env.PORT || 3000;

// App setup
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Z-Key'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Routes
app.use('/', require('./routes/index'));

// Handle uncaught exceptions
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// Initialize database and start server
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => { console.log(`Database is listening and node Running on port ${port}`); });
    }
});