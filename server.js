// server.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

require("dotenv").config({ path: "./config.env" });

// routes
const router = require('./routes/api/router');

const app = express();

// Connect Database
connectDB();

// cors
// app.use(cors({ origin: true, credentials: true }));
app.use(cors());

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
  }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/presale', router);

const port = process.env.PORT || 8082;

app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
