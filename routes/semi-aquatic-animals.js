// Main router for the application
const router = require('express').Router();

// Import the controller, validation middleware, and authentication middleware for semi-aquatic animals
const animalController = require('../controllers/animals');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Define the data format rules for semi-aquatic animals
const DataFormatRule = {
    name: 'required|string',
    species: 'required|string'
};

// Routes for managing semi-aquatic animals
const collectionName = 'semi-aquatic_animals';
router.get('/',
    //#swagger.tags = ['Semi-Aquatic Animals']
    //#swagger.summary = 'Retrieve a list of all semi-aquatic animals.'
    animalController.getAll(collectionName)
);
router.get('/:id',
    //#swagger.tags = ['Semi-Aquatic Animals']
    //#swagger.summary = 'Retrieve a specific semi-aquatic animal by ID.'
    animalController.getSingle(collectionName)
);
router.post('/',
    //#swagger.tags = ['Semi-Aquatic Animals']
    //#swagger.summary = 'Create a new semi-aquatic animal.'
    isAuthenticated,
    validation.saveItem(DataFormatRule),
    animalController.createAnimal(collectionName)
);
router.put('/:id',
    //#swagger.tags = ['Semi-Aquatic Animals']
    //#swagger.summary = 'Update an existing semi-aquatic animal by ID.'
    isAuthenticated,
    validation.saveItem(DataFormatRule),
    animalController.updateAnimal(collectionName)
);
router.delete('/:id',
    //#swagger.tags = ['Semi-Aquatic Animals']
    //#swagger.summary = 'Delete a specific semi-aquatic animal by ID.'
    isAuthenticated,
    animalController.deleteAnimal(collectionName)
);

// Export the router for use in the main application
module.exports = router;