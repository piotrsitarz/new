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
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    }
});

module.exports = {
    Actions
};
