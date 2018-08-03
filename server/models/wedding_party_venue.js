const mongoose = require('mongoose');

const WeddingPartyVenue = mongoose.model('WeddingPartyVenue',{
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
    WeddingPartyVenue
};
