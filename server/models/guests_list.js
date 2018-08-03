const mongoose = require('mongoose');

const GuestsList = mongoose.model('GuestsList',{
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique:true,
    },
    _creator: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
    },
    checkboxs: [{
      women: {
        type: Boolean,
        required: false,
        default: false
      },
      men: {
        type: Boolean,
        required: false,
        default: false
      },
      partner: {
        type: Boolean,
        required: false,
        default: false
      },
      noPartner: {
        type: Boolean,
        required: false,
        default: false
      },
      invite: {
        type: Boolean,
        required: false,
        default: false
      },
      noInvite: {
        type: Boolean,
        required: false,
        default: false
      },
      confirmation: {
        type: Boolean,
        required: false,
        default: false
      },
      noConfirmation: {
        type: Boolean,
        required: false,
        default: false
      },
      accommodation: {
        type: Boolean,
        required: false,
        default: false
      },
      noAccommodation: {
        type: Boolean,
        required: false,
        default: false
      },
      groom: {
        type: Boolean,
        required: false,
        default: false
      },
      bride: {
        type: Boolean,
        required: false,
        default: false
      },
      none: {
        type: Boolean,
        required: true,
        default: true
      }
    }]
});

module.exports = {
    GuestsList
};
