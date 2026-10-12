// Main router for the application
const router = require('express').Router();

// Import the controller, validation middleware, and authentication middleware for our pets
const petController = require('../controllers/pets');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Define the data format rules for our pets
const DataFormatRule = {
    animal_name: 'required|string',
    given_name: 'required|string',
    species: 'required|string',
    age: 'required|string',
    gender: 'required|in:Male,Female',
    health_status: 'required|in:Healthy,Sick,Recovering',
    owner: 'required|string'
};

// Routes for managing our pets
router.get('/',
    //#swagger.tags = ['Our Pets']
    //#swagger.summary = 'Retrieve a list of all our pets.'
    petController.getAll()
);
router.get('/:id',
    //#swagger.tags = ['Our Pets']
    //#swagger.summary = 'Retrieve a specific pet by ID.'
    petController.getSingle()
);
router.post('/',
    //#swagger.tags = ['Our Pets']
    //#swagger.summary = 'Create a new pet.'
    isAuthenticated,
    validation.saveItem(DataFormatRule),
    petController.createPet()
);
router.put('/:id',
    //#swagger.tags = ['Our Pets']
    //#swagger.summary = 'Update an existing pet by ID.'
    isAuthenticated,
    validation.saveItem(DataFormatRule),
    petController.updatePet()
);
router.delete('/:id',
    //#swagger.tags = ['Our Pets']
    //#swagger.summary = 'Delete a specific pet by ID.'
    isAuthenticated,
    petController.deletePet()
);

// Export the router for use in the main application
module.exports = router;