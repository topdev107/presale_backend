const express = require("express");

const router = express.Router();

const ObjectId = require("mongodb").ObjectId;

const Tnx = require("../../../models/Tnx");

router.get('/', (req, res) => {
    Tnx.find()
    .then(data => res.json({"status": "success", "count": data.length,"data": data}))
    .catch(err => res.status(404).json(err));
});

router.get('/get_tnx_24h', (req, res) => {
    const current = Date.now()
    const before24 = current - 24 * 3600 * 1000
    Tnx.find({timestamp: {$gt: before24}})
    .then(data => res.json({
        "status": "success",
        "current": current,
        "before24": before24,
        "count": data.length,        
        "data": data,         
    }))
    .catch(err => res.status(404).json(err));
});

router.get('/get_tnx_amount_24h/:address', (req, res) => {
    const current = Date.now()
    const before24 = current - 24 * 3600 * 1000
    Tnx.find({timestamp: {$gt: before24}, token_address: req.params.address})
    .then(data => {
        var volume24 = parseFloat(0)
        data.forEach(d => {
            volume24 += parseFloat(d.amount)
        })

        res.json({
            "status": "success",
            "volume24": volume24
        })
    })
    .catch(err => res.status(404).json(err));
});

router.post("/add_tnx", (req, res) => {
    Tnx.create(req.body)
        .then((data) => res.json({ status: "success" }))
        .catch((err) => res.json(err));
});


module.exports = router;
