const Promise = require('bluebird');
const mongoose = require('mongoose');
Promise.promisifyAll(mongoose);

const ExerciseSchema = new mongoose.Schema({
    user: String,
    name: String,
    category: String,
    advice: String,
    columns: Number,
    rows: Number,
    initialSolutionXML: String,
    scene: {
        type: {type: String},
        background: String,
        blocks: [String]
    },
    categoriesPermitted: [String],
    grids: [{
        rows: Number,
        columns: Number,
        elements: [{
            type: {type: String},
            icon: String,
            positions: [{
                row: Number,
                column: Number
            }]
        }]
    }],
    publishData: {
        publicationDate: Date,
        categories: {
            type: [String],
            default: undefined
        },
        difficulty: String,
        downloads: Number,
        comments: {
            type: [{
                _id: false,
                author: String,
                date: Date,
                text: String,
            }],
            default: undefined
        },
        rates: {
            type: [{
                author: String,
                rate: Number,
            }],
            default: undefined,
        },
    },

    expectation: String

});

ExerciseSchema.index({name: 1, user: 1}, {unique: true});
mongoose.model('Exercise', ExerciseSchema);

module.exports = mongoose.model('Exercise');
