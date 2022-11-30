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
// app.use(cors({origin:['https://presale-backend.vercel.app', 'https://flash-launch.com']}));
var corsOptions = {
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
  
}

app.use(cors(corsOptions));
app.use(cors({origin: 'https://presale-khaki.vercel.app/'}));

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
  }));

// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'https://presale-khaki.vercel.app/');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/presale', router);

const port = process.env.PORT || 8082;

app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
