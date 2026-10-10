// Validation helper for checking request body against defined rules using validatorjs
const Validator = require('validatorjs');
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

// Export the validator function for use in other modules
module.exports = validator;