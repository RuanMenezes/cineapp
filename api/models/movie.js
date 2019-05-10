import mongoose from 'mongoose';

let Movie = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Oops! Name is required."],
        unique: true
    },
    year: Number,
    plot: String,
    cast: {
        type: [String]
    },
    is_playing: Boolean,
    created_data: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Movie', Movie);

// validate: {
//     validator: function(v) {
//         return v.length > 1
//     },
//     message: "Oops! You must provide more than one actor.",
//     code: 1002
// }