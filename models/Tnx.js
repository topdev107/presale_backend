const mongoose = require('mongoose');

const TnxSchema = new mongoose.Schema({
  token_address: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  }
}, {timestamps: true});

module.exports =  mongoose.model('Tnxs', TnxSchema);
