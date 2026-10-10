// Import necessary modules and database connection
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all animals from the database
const getAll = (collectionName) => async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection(collectionName)
            .find()
            .toArray();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a single animal by ID from the database
const getSingle = (collectionName) => async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid id to find an animal.');
    }

    const id = new ObjectId(req.params.id);

    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection(collectionName)
            .findOne({ _id: id });

        if (!result) {
            return res.status(404).json('Animal not found.');
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Create a new animal in the database
const createAnimal = (collectionName) => async (req, res) => {
    const animal = {
        name: req.body.name,
        species: req.body.species
    };

    try {
        const response = await mongodb
            .getDatabase()
            .db()
            .collection(collectionName)
            .insertOne(animal);

        if (response.acknowledged) {
            return res.status(204).send();
        }

        return res.status(500).json('Some error occurred while creating this animal.');
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Update an existing animal in the database
const updateAnimal = (collectionName) => async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid id to update an animal.');
    }

    const id = new ObjectId(req.params.id);

    const animal = {
        name: req.body.name,
        species: req.body.species
    };

    try {
        const response = await mongodb
            .getDatabase()
            .db()
            .collection(collectionName)
            .replaceOne(
                { _id: id },
                animal
            );

        if (response.matchedCount === 0) {
            return res.status(404).json('Animal not found.');
        }

        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Delete an animal from the database
const deleteAnimal = (collectionName) => async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid id to delete an animal.');
    }

    const id = new ObjectId(req.params.id);

    try {
        const response = await mongodb
            .getDatabase()
            .db()
            .collection(collectionName)
            .deleteOne({ _id: id });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        }

        return res.status(404).json('Animal not found.');
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Export all controller functions for terrestrial animals
module.exports = {
    getAll,
    getSingle,
    createAnimal,
    updateAnimal,
    deleteAnimal
};