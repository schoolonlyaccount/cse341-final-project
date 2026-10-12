// Main router for the application
const router = require('express').Router();

// Import the controller, validation middleware, and authentication middleware for aquatic animals
const animalController = require('../controllers/animals');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Define the data format rules for aquatic animals
const DataFormatRule = {
    name: 'required|string',
    species: 'required|string'
};

// Routes for managing aquatic animals
const collectionName = 'aquatic_animals';
router.get('/',
    //#swagger.tags = ['Aquatic Animals']
    //#swagger.summary = 'Retrieve a list of all aquatic animals.'
    animalController.getAll(collectionName)
);
router.get('/:id',
    //#swagger.tags = ['Aquatic Animals']
    //#swagger.summary = 'Retrieve a specific aquatic animal by ID.'
    animalController.getSingle(collectionName)
);
router.post('/',
    //#swagger.tags = ['Aquatic Animals']
    //#swagger.summary = 'Create a new aquatic animal.'
    isAuthenticated,
    validation.saveItem(DataFormatRule),
    animalController.createAnimal(collectionName)
);
router.put('/:id',
    //#swagger.tags = ['Aquatic Animals']
    //#swagger.summary = 'Update an existing aquatic animal by ID.'
    isAuthenticated,
    validation.saveItem(DataFormatRule),
    animalController.updateAnimal(collectionName)
);
router.delete('/:id',
    //#swagger.tags = ['Aquatic Animals']
    //#swagger.summary = 'Delete a specific aquatic animal by ID.'
    isAuthenticated,
    animalController.deleteAnimal(collectionName)
);

// Export the router for use in the main application
module.exports = router;