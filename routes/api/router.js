const express = require("express")
require('express-group-routes');

// const tnxs = require('./v1/tnxs');
const presale = require('./v1/presale');

const router = express.Router();


router.group((router) => { 
    // router.use('/tnxs', tnxs);
    router.use('/launchpad', presale)
});

module.exports = router;