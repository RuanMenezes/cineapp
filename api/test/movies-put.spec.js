import chai from 'chai';
import chaiHttp from 'chai-http';

import moviesModel from '../models/movie'
import { disconnect } from 'cluster';
import { endianness } from 'os';

chai.use(chaiHttp);

const app = require('../app');
const expect = chai.expect;
const request = chai.request(app);

describe('Put Movies', () => {

    describe('deve atualizar o filme', () => {

        let movie = {
            _id: require("mongoose").Types.ObjectId(),
            name: "Capitão América 2",
            year: 2012,
            cast: ["Chris Evans", "Anthony Mackie", "Scarlett Johansson s2"]
        }

        it('quando o mesmo existe', (done) => {
            moviesModel.insertMany([movie], (error, result) => {

                movie.name = "Capitão América 2 -  O Soldado Infernal"
                movie.year = 2014

                request
                    .put('/movies/' + movie._id)
                    .send(movie)
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    })
            })
        })

        after((done) => {
            request
                .get('/movies/' + movie._id)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.data.name).to.equal(movie.name)
                    expect(res.body.data.year).to.equal(movie.year)
                    done();
                })
        })

    })


})