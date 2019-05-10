import chai from 'chai';
import chaiHttp from 'chai-http';

import moviesModel from '../models/movie'
import { disconnect } from 'cluster';

chai.use(chaiHttp);

const app = require('../app');
const expect = chai.expect;
const request = chai.request(app);

describe('Delete Movies', () => {

    describe('deve remover um filme', () => {

        let movie = {
            _id: require('mongoose').Types.ObjectId(),
            name: 'O Incrível Hulk',
            year: 2008,
            cast: ['Edward Norton', 'Liv Tyler'],
            plot: 'Aquele filme que não deu muito certo e poucos gostaram'
        }

        it('quando deleto por id', (done) => {
            moviesModel.insertMany([movie], (error, result) => {
                request
                    .delete('/movies/' + movie._id.toString())
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res.body).to.eql({})
                        done();
                    })
            })
        })

        after((done) => {
            request
                .get('/movies/' + movie._id.toString())
                .end((err, res) => {
                    expect(res).to.have.status(404)
                    done();
                })
        })
    })

    describe('deve retornar 404', () => {
        it('quando o id não existe no banco', (done) => {
            var id = require('mongoose').Types.ObjectId();
            request
                .delete('/movies/' + id)
                .end((err, res) => {
                    expect(res).to.have.status(404)
                    expect(res.body).to.eql({})
                    done();
                })
                
        })
    })

})