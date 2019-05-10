import chai from 'chai';
import chaiHttp from 'chai-http';

import moviesModel from '../models/movie'
import { disconnect } from 'cluster';

chai.use(chaiHttp);

const app = require('../app');
const expect = chai.expect;
const request = chai.request(app);

describe("Get Movies", () => {

    // before((done) => {
    //     moviesModel.deleteMany({}, (err, result) => { });
    //     done();
    // }) 

    describe('deve retornar uma lista de filmes', () => {
        before((done) => {
            let movies = [
                { name: 'Deadpool 2', year: 2018, cast: ['Ryan Reynolds', 'Josh Brolin'], plot: 'O supersoldado Cable vem do futuro com a missão de assassinar o jovem mutante Russel e o mercenário Deadpool precisa aprender o que é ser herói de verdade para salvá-lo.' },
                { name: 'Vingadores Era de Ultron', year: 2015, cast: ['Robert Downey Jr.', 'Elizabeth Olsen'], plot: 'Ao tentar proteger o planeta de ameaças, Tony Stark constrói um sistema de inteligência artificial que cuidaria da paz mundial.' },
                { name: 'Vingadores Endgame', year: 2019, cast: ['Robert Downey Jr.', 'Chris Evans'], plot: 'Após Thanos eliminar metade das criaturas vivas, os Vingadores têm de lidar com a perda de amigos e entes queridos.' }
            ]

            moviesModel.insertMany(movies, (err, result) => { });
            done();
        })

        it('quando eu faço um get', (done) => {
            request
                .get('/movies')
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.data).to.be.an('array');
                    done();
                })
        })

        it('quando eu faço um filtro por nome do filme', (done) => {
            request
                .get('/movies')
                .query({ name: 'Vingadores' })
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body.data[0].name).to.equal('Vingadores Era de Ultron')
                    expect(res.body.data[1].name).to.equal('Vingadores Endgame')
                    done()
                })
        })

    })

    describe('deve retornar um único filme', () => {
        it('quando eu busco por id', (done) => {

            let movies = [
                { name: 'Guardiões da Galáxia Vol. 2', year: 2017, cast: ['Chris Pratt', 'Zoe Saldana'], plot: 'Agora já conhecidos como os Guadiões da Galáxia, eles viagam ao longo do cosmos.' }
            ]

            moviesModel.insertMany(movies, async (err, result) => {
                var id = result[0]._id
                request
                    .get('/movies/' + id)
                    .end((err, res) => {
                        expect(res).to.have.status(200)
                        expect(res.body.data.name).to.eql("Guardiões da Galáxia Vol. 2")
                    })
                done();
            });
        })
    })

    describe('deve retornar 404', () => {
        it('quando o id não existe no banco', (done) => {
            var id = require('mongoose').Types.ObjectId();
            request
                .get('/movies/' + id)
                .end((err, res) => {
                    expect(res).to.have.status(404)
                    expect(res.body).to.eql({})
                    done();
                })
                
        })
    })


})