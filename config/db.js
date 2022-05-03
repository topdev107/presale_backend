const mongoose = require('mongoose');

require("dotenv").config({ path: "./config.env" });

const db = process.env.ATLAS_URI;

var _db;

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      { useNewUrlParser: true }
    );

    console.log('MongoDB is Connected...');

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
