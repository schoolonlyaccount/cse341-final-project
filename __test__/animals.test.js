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

// Tests for the Terrestrial Animal API endpoints
describe('Terrestrial Animal GET Endpoints', () => {
    test('GET all animals returns 200', async () => {
        const response = await request(app)
            .get('/terrestrial-animals');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET a single animal returns 200 for a valid ID', async () => {
        const id = '6aca1d2f9837d988524652dc';

        const response = await request(app)
            .get(`/terrestrial-animals/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', id);
    });

    test('GET a single animal returns 404 when the animal does not exist', async () => {
        const id = '000000000000000000000001';

        const response = await request(app)
            .get(`/terrestrial-animals/${id}`);

        expect(response.statusCode).toBe(404);
    });

    test('GET a single animal returns 400 for an invalid ID', async () => {
        const id = 'invalid-id';

        const response = await request(app)
            .get(`/terrestrial-animals/${id}`);

        expect(response.statusCode).toBe(400);
    });
});

// Tests for the Aquatic Animal API endpoints
describe('Aquatic Animal GET Endpoints', () => {
    test('GET all animals returns 200', async () => {
        const response = await request(app)
            .get('/aquatic-animals');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET a single animal returns 200 for a valid ID', async () => {
        const id = '6aca1d719837d988524652e2';

        const response = await request(app)
            .get(`/aquatic-animals/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', id);
    });

    test('GET a single animal returns 404 when the animal does not exist', async () => {
        const id = '000000000000000000000001';

        const response = await request(app)
            .get(`/aquatic-animals/${id}`);

        expect(response.statusCode).toBe(404);
    });

    test('GET a single animal returns 400 for an invalid ID', async () => {
        const id = 'invalid-id';

        const response = await request(app)
            .get(`/aquatic-animals/${id}`);

        expect(response.statusCode).toBe(400);
    });
});

// Tests for the Semi-Aquatic Animal API endpoints
describe('Semi-Aquatic Animal GET Endpoints', () => {
    test('GET all animals returns 200', async () => {
        const response = await request(app)
            .get('/semi-aquatic-animals');

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET a single animal returns 200 for a valid ID', async () => {
        const id = '6aca1f389837d988524652f4';

        const response = await request(app)
            .get(`/semi-aquatic-animals/${id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('_id', id);
    });

    test('GET a single animal returns 404 when the animal does not exist', async () => {
        const id = '000000000000000000000001';

        const response = await request(app)
            .get(`/semi-aquatic-animals/${id}`);

        expect(response.statusCode).toBe(404);
    });

    test('GET a single animal returns 400 for an invalid ID', async () => {
        const id = 'invalid-id';

        const response = await request(app)
            .get(`/semi-aquatic-animals/${id}`);

        expect(response.statusCode).toBe(400);
    });
});

// Close the database connection after all tests have run
afterAll(async () => {
    await mongodb.getDatabase().close();
});