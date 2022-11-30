const express = require("express")
require('express-group-routes');


const authMiddleware = require('../../middleware/auth');
const auth = require('./v1/auth');

// const tnxs = require('./v1/tnxs');
const presale = require('./v1/presale');

const router = express.Router();

router.use('/auth', auth);
router.group((router) => { 
    // router.use('/tnxs', tnxs);
    router.use('/launchpad', presale)
});

module.exports = router;