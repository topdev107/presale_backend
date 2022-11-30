const mongoose = require('mongoose');

const PresaleSchema = new mongoose.Schema({
  token_owner: {
    type:String,
    required: true
  },
  presale_addr: {
    type: String,
    required: true
  },
  token_name: {
    type: String,
    required: true
  },
  token_symbol: {
    type: String,
    required: true
  },
  token_decimal: {
    type: Number,
    default: 0,
    required: true,

  },
  token_supply: {
    type: Number,
    default: 0,
    required: true,
  },
  token_addr: {
    type: String,
    required: true
  },
  iswhitelist: {
    type: Boolean,
  },
  token_presale_rate: {
    type: Number,
    default: 0,
  },
  token_listing_rate: {
    type: Number,
    default: 0,
  },
  softcap: {
    type: Number,
    default: 0.0,
    required: true,
  },
  hardcap: {
    type: Number,
    default: 0.0,
  },
  unsold: {
    type: Boolean,
  },
  starttime: {
    type: Date,
    required: true,
  },
  endtime: {
    type: Date,
    required: true,
  },
  liquidityPercent: {
    type: Number,
    required: true,
  },
  lockupTime: {
    type: Number,
    required: true,
  },
  maxBuy: {
    type: Number,
  },
  minBuy: {
    type: Number,
    required: true,
  },
  useVestingCont: {
    type: Boolean,
    default: false,
    required: true,
  },
  ves_firstReleasePresale: {
    type: Number,
  },
  ves_vestingPeriod: {
    type: Number,
  },
  ves_presaleTokenRelease: {
    type: Number,
  },
  useTeamVest: {
    type: Boolean,
    default: false,
    required: true,
  },
  team_totalTeamVest: {
    type: Number,
  },
  team_firstTokenReleaseMinute: {
    type: Number,
  },
  team_firstTokenReleasePercent: {
    type: Number,
  },
  team_vestingPeriod: {
    type: Number,
  },
  team_teamTokenRelease: {
    type: Number,
  },
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
  presaletype: {
    type: Boolean,
    required: true,
  },
  network: {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
    required: true
  }
});
// }, {timestamps: true});

module.exports =  mongoose.model('Presale', PresaleSchema);
