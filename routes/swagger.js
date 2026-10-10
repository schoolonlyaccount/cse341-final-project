
// Router setup for Swagger UI
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Swagger UI setup for API documentation
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', (req, res, next) => {
    swaggerUi.setup(swaggerDocument)(req, res, next);
});

// Export the router for use in the main application
module.exports = router;