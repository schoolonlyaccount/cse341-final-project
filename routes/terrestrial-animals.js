// Main router for the application
const router = require('express').Router();

// Import the controller and validation middleware for terrestrial animals
const animalController = require('../controllers/animals');
const validation = require('../middleware/validate');

// Define the data format rules for terrestrial animals
const DataFormatRule = {
    name: 'required|string',
    species: 'required|string'
};

// Routes for managing terrestrial animals
router.get('/',
    //#swagger.tags = ['Terrestrial Animals']
    //#swagger.summary = 'Retrieve a list of all terrestrial animals.'
    animalController.getAll('terrestrial_animals')
);
router.get('/:id',
    //#swagger.tags = ['Terrestrial Animals']
    //#swagger.summary = 'Retrieve a specific terrestrial animal by ID.'
    animalController.getSingle('terrestrial_animals')
);
router.post('/',
    //#swagger.tags = ['Terrestrial Animals']
    //#swagger.summary = 'Create a new terrestrial animal.'
    validation.saveItem(DataFormatRule),
    animalController.createAnimal('terrestrial_animals')
);
router.put('/:id',
    //#swagger.tags = ['Terrestrial Animals']
    //#swagger.summary = 'Update an existing terrestrial animal by ID.'
    validation.saveItem(DataFormatRule),
    animalController.updateAnimal('terrestrial_animals')
);
router.delete('/:id',
    //#swagger.tags = ['Terrestrial Animals']
    //#swagger.summary = 'Delete a specific terrestrial animal by ID.'
    animalController.deleteAnimal('terrestrial_animals')
);

// Export the router for use in the main application
module.exports = router;