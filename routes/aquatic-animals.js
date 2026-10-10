// Main router for the application
const router = require('express').Router();

// Import the controller and validation middleware for aquatic animals
const animalController = require('../controllers/animals');
const validation = require('../middleware/validate');

// Define the data format rules for aquatic animals
const DataFormatRule = {
    name: 'required|string',
    species: 'required|string'
};

// Routes for managing aquatic animals
router.get('/',
    //#swagger.tags = ['Aquatic Animals']
    //#swagger.summary = 'Retrieve a list of all aquatic animals.'
    animalController.getAll('aquatic_animals')
);
router.get('/:id',
    //#swagger.tags = ['Aquatic Animals']
    //#swagger.summary = 'Retrieve a specific aquatic animal by ID.'
    animalController.getSingle('aquatic_animals')
);
router.post('/',
    //#swagger.tags = ['Aquatic Animals']
    //#swagger.summary = 'Create a new aquatic animal.'
    validation.saveItem(DataFormatRule),
    animalController.createAnimal('aquatic_animals')
);
router.put('/:id',
    //#swagger.tags = ['Aquatic Animals']
    //#swagger.summary = 'Update an existing aquatic animal by ID.'
    validation.saveItem(DataFormatRule),
    animalController.updateAnimal('aquatic_animals')
);
router.delete('/:id',
    //#swagger.tags = ['Aquatic Animals']
    //#swagger.summary = 'Delete a specific aquatic animal by ID.'
    animalController.deleteAnimal('aquatic_animals')
);

// Export the router for use in the main application
module.exports = router;