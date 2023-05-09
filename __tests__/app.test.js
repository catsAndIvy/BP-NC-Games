const testData = require('../db/data/test-data/index');
const request = require('supertest');
const app = require('../db/app');
const seed = require('../db/seeds/seed')
const connection = require('../db/connection')

beforeEach(() => seed(testData));

afterAll(() => {
    connection.end()
})

describe('GET /api/categories', () => {
    test('get status 200 response', () => {
        return request(app).get('/api/categories').expect(200);
    });
    test('returns all information in the categories table including slug and description', () => {
        return request(app).get('/api/categories').expect(200).then((response)=> {
            expect(response.body.categories.length).toBe(4);
            response.body.categories.forEach((category)=> {
                expect(typeof category.slug).toBe('string');
                expect(typeof category.description).toBe('string')
            });
        })
    });
});

