const mongoose = require('mongoose');

const DateOfWedding = mongoose.model('DateOfWedding',{
    date: {
        type: String,
        required: true
    },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      required:true
    }
});

module.exports = {
    DateOfWedding
};
