// Main router for the application
const router = require('express').Router();

// Route for Swagger API documentation
router.use('/', require('./swagger'));

// Routes for different types of animals
router.use('/terrestrial-animals', require('./terrestrial-animals'));
router.use('/aquatic-animals', require('./aquatic-animals'));

// Export the router for use in the main application
module.exports = router;