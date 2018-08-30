const mongoose = require('mongoose');

const Actions = mongoose.model('Actions',{
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique:true
    },
    type: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    note: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        required: true
    },
    utc: {
        type: Number,
        required: true
    },
    done: {
        type: Boolean,
        required: false,
        minlength: 1,
        trim: true,
        default: false
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    }
});

module.exports = {
    Actions
};
