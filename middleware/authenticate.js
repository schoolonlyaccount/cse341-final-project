// Middleware to check if a user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json("You do not have access to this operation.");
    }
    next();
};

// Export the authentication middleware function
module.exports = {
    isAuthenticated
};