// Main router for the application, handling routes for animals, pets, and user authentication
const router = require('express').Router();
const passport = require('passport');

// Route for Swagger API documentation
router.use('/', require('./swagger'));

// Routes for different types of animals
router.use('/terrestrial-animals', require('./terrestrial-animals'));
router.use('/aquatic-animals', require('./aquatic-animals'));
router.use('/semi-aquatic-animals', require('./semi-aquatic-animals'));
//router.use('/aerial-animals', require('./aerial-animals')); // <-- Scrapped Collection

// Routes for our pets section
router.use('/our-pets', require('./our-pets'));

// Routes for user authentication via GitHub
router.get('/login', passport.authenticate('github'), (req, res) => { });
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

// Export the router for use in the main application
module.exports = router;