const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
})

// we are going to export the model (model refers to the collections) which will be of type bookSchema

module.exports = mongoose.model('Book', bookSchema);