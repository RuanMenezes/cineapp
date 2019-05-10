import Movie from './models/movie';

export default {
    create: (req, res) => {
        let movie = new Movie(req.body)

        movie.save((err, data) => {
            if (!err) {
                return res.status(200).json({ data: data })
            }

            if (err.name === "ValidationError") {
                return res.status(400).json(err)
            }

            return res.status(500).json(err)
        })
    },
    list: (req, res) => {
        let query = {}

        if (req.query.name) {
            query.name = new RegExp(req.query.name, 'i')
        }

        Movie.find(query, {}, { sort: '-date' }, (err, result) => {
            return res.status(200).json({ data: result });
        })
    },
    get: (req, res) => {
        let id = req.params.id

        Movie.findById({ _id: id }, {}, { sort: '-date' }, (err, result) => {
            if (!result) {
                return res.status(404).send(null);
            } else {
                return res.status(200).json({ data: result });
            }
        })
    },
    remove: (req, res) => {
        Movie.findOneAndDelete({ _id: req.params.id }, (err, result) => {
            if (result) {
                return res.status(200).send(null);
            } else {
                return res.status(404).send(null);
            }
        })
    },
    update: (req, res) => {
        // Desafio da semana
        // findOneAndUpdate
    }
}