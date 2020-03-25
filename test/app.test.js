const {expect} = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('app', () => {
    describe('GET /app', () => {
        it('should return a list of apps with a 200 message', () => {
            return supertest(app)
                .get('/apps')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf.at.least(1);
                    expect(res.body[0]).to.include.keys
                        'App', 'Rating'
                    });
                });
        });
    });


