const {Schema} = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    }, 
    image: {
        type: String
    },
    movieId: {
        type: String,
        required: true
    },
    overview: {
        type: String
    }

});

module.exports = movieSchema;