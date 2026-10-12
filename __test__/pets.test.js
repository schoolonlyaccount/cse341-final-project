// Import necessary modules for testing
const request = require('supertest');
const app = require('../server');
const mongodb = require('../db/connect');

// Initialize the database before running tests
beforeAll((done) => {
    mongodb.initDb((err) => {
        if (err) {
            done(err);
        } else {
            done();
        }
    });
});

// Tests for the Our Pets API endpoints
describe('Our Pets GET Endpoints', () => {
    test('GET all pets returns 200', async () => {
        const response = await request(app)
            .get('/our-pets');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET a single pet returns 200 for a valid ID', async () => {
        const id = '6aca20c69837d988524652fd';

        const response = await request(app)
            .get(`/our-pets/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', id);
    });

    test('GET a single pet returns 404 when the pet does not exist', async () => {
        const id = '000000000000000000000001';

        const response = await request(app)
            .get(`/our-pets/${id}`);

        expect(response.statusCode).toBe(404);
    });

    test('GET a single pet returns 400 for an invalid ID', async () => {
        const id = 'invalid-id';

        const response = await request(app)
            .get(`/our-pets/${id}`);

        expect(response.statusCode).toBe(400);
    });
});

// Close the database connection after all tests have run
afterAll(async () => {
    await mongodb.getDatabase().close();
});