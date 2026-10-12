// Router setup for Swagger UI
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Swagger UI setup for API documentation
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', (req, res, next) => {

    // Clone the swagger document to modify it for unauthenticated users
    const spec = JSON.parse(JSON.stringify(swaggerDocument));
    if (req.session.user === undefined) {
        const protectedMethods = ['post', 'put', 'delete'];

        for (const path of Object.values(spec.paths)) {
            for (const method of protectedMethods) {
                delete path[method];
            }
        }
    }

    // Serve the modified Swagger document to the client
    swaggerUi.setup(req.session.user === undefined ? spec : swaggerDocument)(req, res, next);
});

// Export the router for use in the main application
module.exports = router;