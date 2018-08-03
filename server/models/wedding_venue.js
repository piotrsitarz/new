const mongoose = require('mongoose');

const WeddingVenue = mongoose.model('WeddingVenue',{
    place: {
        type: String,
        required: true
    },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      required:true
    }
});

module.exports = {
    WeddingVenue
};
