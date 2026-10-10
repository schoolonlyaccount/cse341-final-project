// Import the validator helper function
const validator = require('../helpers/validate');

// Middleware for validating request bodies against defined rules using the validator helper
const saveItem = (rule) => (req, res, next) => {
    const validationRule = rule;
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

// Export the validation middleware functions for use in routes
module.exports = {
    saveItem
};