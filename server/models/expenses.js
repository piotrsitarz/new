const mongoose = require('mongoose');

const Expenses = mongoose.model('Expenses',{
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique:true
    },
    price: {
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
    Expenses
};
