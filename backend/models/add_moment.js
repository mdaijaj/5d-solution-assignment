const mongoose = require('../database/db');
const Schema = mongoose.Schema;

var moments_schema = new Schema({
    title: {
        type: String,
        maxlength: [30, "title cannot exceed 30 charactor"],
        min: [4, "title should be more than 4 charactor"],
    },
    file: {
        type: String,
    },
    comments: {
        type: String,
        maxlength: [30, "title cannot exceed 30 charactor"],
        min: [4, "title should be more than 4 charactor"]
    },
    tags: {
        type: [String],
    },
}, 
{
    timestamps: true
});


const User = mongoose.model('Moment', moments_schema);
module.exports = User;