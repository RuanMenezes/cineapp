import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import crud from "./crud";

import Movie from './models/movie';

const app = express();

app.use(cors({
    origins: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://192.168.99.100/cinedb', { useNewUrlParser: true });

app.get('/movies', crud.list)
app.get('/movies/:id', crud.get)
app.delete('/movies/:id', crud.remove)
app.post('/movies', crud.create)
app.put('/movies/:id', crud.update)

app.listen(3000, () => {
    console.log("CineApi está no AR!");
});

module.exports = app;


// ES6 ou EcmaScript6 => ES2015
// ES5 ou EcmaScript5
