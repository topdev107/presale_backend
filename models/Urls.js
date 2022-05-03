const mongoose = require('mongoose');

const PresaleSchema = new mongoose.Schema({
  logoURL: {
    type: String,
    required: true,
  },
  websiteURL: {
    type: String,
    required: true,
  },
  facebookURL: {
    type: String,
  },
  twitterURL: {
    type: String,
  },
  githubURL: {
    type: String,
  },
  telegramURL: {
    type: String,
  },
  instagramURL: { 
    type: String,
  },
  discordURL: {
    type: String,
  },
  redditURL: {
    type: String,
  },
  description: {
    type: String,
  },
});
// }, {timestamps: true});

module.exports =  mongoose.model('Presale', PresaleSchema);
