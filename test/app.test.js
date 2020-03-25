const {
    expect
} = require('chai');
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
                    expect(res.body[0]).to.include.keys 'App', 'Rating'
                });
        });
    });


    const validSortValues = ['Rating', 'App'];
    validSortValues.forEach(validSort => {
        it(`should return 200 with sorted array ${validSort}`, () => {
            return supertest(app)
                .get('./app')
                .query({
                    sort: validSort
                })
                .expect(200)
                .then(res => {
                    let i = 0,
                        sorted = true;
                    while (i < res.body.length - 1) {
                        if (res.body[i][validSort]) {
                            sorted = false;
                            break;
                        }
                        i++;
                    }
                    expect(sorted).to.be.true;
                });
        });
    })

    it('return 400 if there is no rating or sort', () => {
        return request(app)
        .get('/apps')
        .query( { sort: 'not valid'})
        .expect(400, 'You need to select a sort!') 
    })

    it('should return 400 if genres parameter is invalid', () => {
        return supertest(app)
        .get('./apps')
        .query({genres: 'invalid'})
        .expect(400, 'Parameters genre must be valid')
        
    })


    it('it should filter by genre', () => {
        let expected = apps.filter(app => app["Genres"].includes("Action"));

        return supertest(app)
        .get('./apps')
        .query( {genres: "Action"})
        .expect(200)
        .expect("Content-type", /json/)
        .then(res => {
            expect(res.body).to.be.an('arry');
            expect(res.body).to.deep.equal(expected);
        });
    });


})