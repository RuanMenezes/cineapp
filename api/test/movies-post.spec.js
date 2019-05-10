import chai from 'chai';
import chaiHttp from 'chai-http';

import moviesModel from '../models/movie'
import { disconnect } from 'cluster';

chai.use(chaiHttp);

const app = require('../app');
const expect = chai.expect;
const request = chai.request(app);


describe("Post Movies", () => {
    it("deve cadastrar um novo filme", (done) => {
        request
            .post('/movies')
            .send({ name: "The Avengers", year: 2012, cast: ["Cris Evans", "Robert Downey Jr."] })
            .end((err, res) => {
                expect(res).to.has.status(200);
                expect(res.body.data.name).to.be.an('string')
                expect(res.body.data.year).to.be.an('number')
                expect(res.body.data.cast).to.be.an('array')
                done();
            })
    })

    describe('deve retornar erro 400', () => {

        it('quando não informo o nome', (done) => {
            request
                .post('/movies')
                .send({ year: 2012, cast: ["Cris Evans", "Robert Downey Jr."] })
                .end((err, res) => {
                    expect(res).to.has.status(400);
                    expect(res.body.errors.name.message).to.equal("Oops! Name is required.")
                    done();
                })
        })

        it('quando o ano é string', (done) => {
            request
                .post('/movies')
                .send({ name: "The Avengers", year: "abcd", cast: ["Cris Evans", "Robert Downey Jr."] })
                .end((err, res) => {
                    expect(res).to.has.status(400);
                    expect(res.body.errors.year.message).to.include('Number failed for value "abcd"')
                    done();
                })
        })

        it('quando informo somente 1 ator', (done) => {
            request
                .post('/movies')
                .send({name: "Wifi Half", year: 2018, cast: ["Gal Godot"] })
                .end((err, res) => {
                    expect(res).to.has.status(400);
                    expect(res.body.errors.cast.message).to.equal("Oops! You must provide more than one actor.")
                    done();
                })
        })

    })

    describe('deve retornar erro 500', () => {

        let movie = { name: "Shazam", year: 2019, cast: ["Zachary Levi", "Mark Strong"] }

        before((done) => {
            request
                .post('/movies')
                .send(movie)
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    done();
                })
        })

        it('quando o filme já foi cadastrado', (done) => {
            request
                .post('/movies')
                .send(movie)
                .end((err, res) => {
                    expect(res).to.has.status(500);
                    expect(res.body.errmsg).to.include('duplicate key')
                    done();
                })
        })

    })


})