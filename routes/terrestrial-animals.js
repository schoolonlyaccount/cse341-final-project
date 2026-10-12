// Main router for the application
const router = require('express').Router();

// Import the controller, validation middleware, and authentication middleware for terrestrial animals
const animalController = require('../controllers/animals');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Define the data format rules for terrestrial animals
const DataFormatRule = {
    name: 'required|string',
    species: 'required|string'
};

// Routes for managing terrestrial animals
const collectionName = 'terrestrial_animals';
router.get('/',
    //#swagger.tags = ['Terrestrial Animals']
    //#swagger.summary = 'Retrieve a list of all terrestrial animals.'
    animalController.getAll(collectionName)
);
router.get('/:id',
    //#swagger.tags = ['Terrestrial Animals']
    //#swagger.summary = 'Retrieve a specific terrestrial animal by ID.'
    animalController.getSingle(collectionName)
);
router.post('/',
    //#swagger.tags = ['Terrestrial Animals']
    //#swagger.summary = 'Create a new terrestrial animal.'
    isAuthenticated,
    validation.saveItem(DataFormatRule),
    animalController.createAnimal(collectionName)
);
router.put('/:id',
    //#swagger.tags = ['Terrestrial Animals']
    //#swagger.summary = 'Update an existing terrestrial animal by ID.'
    isAuthenticated,
    validation.saveItem(DataFormatRule),
    animalController.updateAnimal(collectionName)
);
router.delete('/:id',
    //#swagger.tags = ['Terrestrial Animals']
    //#swagger.summary = 'Delete a specific terrestrial animal by ID.'
    isAuthenticated,
    animalController.deleteAnimal(collectionName)
);

// Export the router for use in the main application
module.exports = router;