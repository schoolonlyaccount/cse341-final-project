// Import necessary modules and database connection
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all pets from the database
const getAll = () => async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('our_pets')
            .find()
            .toArray();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a single pet by ID from the database
const getSingle = () => async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid id to find a pet.');
    }

    const id = new ObjectId(req.params.id);

    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('our_pets')
            .findOne({ _id: id });

        if (!result) {
            return res.status(404).json('Pet not found.');
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Create a new pet in the database
const createPet = () => async (req, res) => {
    const animal = {
        animal_name: req.body.animal_name,
        given_name: req.body.given_name,
        species: req.body.species,
        age: req.body.age,
        gender: req.body.gender,
        health_status: req.body.health_status,
        owner: req.body.owner
    };

    try {
        const response = await mongodb
            .getDatabase()
            .db()
            .collection('our_pets')
            .insertOne(animal);

        if (response.acknowledged) {
            return res.status(204).send();
        }

        return res.status(500).json('Some error occurred while creating this pet.');
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Update an existing pet in the database
const updatePet = () => async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid id to update a pet.');
    }

    const id = new ObjectId(req.params.id);

    const animal = {
        animal_name: req.body.animal_name,
        given_name: req.body.given_name,
        species: req.body.species,
        age: req.body.age,
        gender: req.body.gender,
        health_status: req.body.health_status,
        owner: req.body.owner
    };

    try {
        const response = await mongodb
            .getDatabase()
            .db()
            .collection('our_pets')
            .replaceOne(
                { _id: id },
                animal
            );

        if (response.matchedCount === 0) {
            return res.status(404).json('Pet not found.');
        }

        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Delete a pet from the database
const deletePet = () => async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid id to delete a pet.');
    }

    const id = new ObjectId(req.params.id);

    try {
        const response = await mongodb
            .getDatabase()
            .db()
            .collection('our_pets')
            .deleteOne({ _id: id });

        if (response.deletedCount > 0) {
            return res.status(204).send();
        }

        return res.status(404).json('Pet not found.');
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Export all controller functions for pets
module.exports = {
    getAll,
    getSingle,
    createPet,
    updatePet,
    deletePet
};