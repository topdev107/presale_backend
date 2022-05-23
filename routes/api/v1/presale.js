const express = require("express");

const router = express.Router();

const ObjectId = require("mongodb").ObjectId;

const Presale = require("../../../models/Presale");

// router.get('/', (req, res) => {
//     res.send("hello world")
//     // Presale.find()
//     // .then(data => res.json({"status": "success"
//     // // , "count": data.length,"data": data
//     // }))
//     // .catch(err => res.status(404).json(err));
// });



router.get('/all/', (req, res) => {
    console.log('all, -0------')
    
    Presale.find()
    .then(data => {
        console.log(data)
        res.json(data)
    })
    .catch(err => res.status(404).json(err))
})

router.get('/page', (req, res) => {
    console.log('pages, -1-------')
    
    const currentPage = req.query.currentPage
    const pageCount = req.query.pageCount
    console.log(currentPage, pageCount)
    Presale.find({
        },
        {
            logoURL: 1, presale_addr: 1, token_name: 1, token_symbol: 1, token_presale_rate: 1, softcap: 1, hardcap: 1,
            liquidityPercent: 1, lockupTime: 1, starttime: 1, endtime: 1, presaletype: 1,
            _id: 1
        }
    ).limit(+pageCount).skip((+currentPage - 1) * +pageCount)
    .then(data => {
        console.log(data)
        res.json(data)
    })
    .catch(err => res.status(404).json(err))
})

router.get('/myzone', (req, res) => {
    console.log('pages, -myzone-------')
    
    const currentPage = req.query.currentPage
    const pageCount = req.query.pageCount
    const owner = req.query.owner
    console.log(currentPage, pageCount)
    Presale.find({
            token_owner: owner
        },
        {
            logoURL: 1, presale_addr: 1, token_name: 1, token_symbol: 1, token_presale_rate: 1, softcap: 1, hardcap: 1,
            liquidityPercent: 1, lockupTime: 1, starttime: 1, endtime: 1, presaletype: 1,
            _id: 1
        }
    ).limit(+pageCount).skip((+currentPage - 1) * +pageCount)
    .then(data => {
        console.log(data)
        res.json(data)
    })
    .catch(err => res.status(404).json(err))
})


router.get('/:_id', (req, res) => {
    console.log(req.params, 'here-----------------')
    Presale.findById(req.params._id)
        .then(data => {
            res.json(data)
            console.log(data)
        })
        .catch(err => res.status(404).json(err))
})

router.post('/addpad', (req, res) => {
    console.log('here -------- ', req)
    const { token_owner, presale_addr, token_name, token_symbol, token_decimal, token_supply, token_addr, iswhitelist,
        token_presale_rate, token_listing_rate, softcap, hardcap, unsold, starttime, endtime, 
        liquidityPercent, lockupTime, maxBuy, minBuy, useVestingCont, ves_firstReleasePresale,
        ves_vestingPeriod, ves_presaleTokenRelease, useTeamVest, team_totalTeamVest, team_firstTokenReleaseMinute,
        team_firstTokenReleasePercent, team_vestingPeriod, team_teamTokenRelease, logoURL, websiteURL, facebookURL,
        twitterURL, githubURL, telegramURL, instagramURL, discordURL, redditURL, description, presaletype } = req.body;
        
    const presale = new Presale ({ token_owner, presale_addr, token_name, token_symbol, token_decimal, token_supply, token_addr, iswhitelist,
        token_presale_rate, token_listing_rate, softcap, hardcap, unsold, starttime, endtime, 
        liquidityPercent, lockupTime, maxBuy, minBuy, useVestingCont, ves_firstReleasePresale,
        ves_vestingPeriod, ves_presaleTokenRelease, useTeamVest, team_totalTeamVest, team_firstTokenReleaseMinute,
        team_firstTokenReleasePercent, team_vestingPeriod, team_teamTokenRelease, logoURL, websiteURL, facebookURL,
        twitterURL, githubURL, telegramURL, instagramURL, discordURL, redditURL, description, presaletype });
    presale.save()
    .then((result) => {
        res.json(result);
    })
})

/*
router.get('/get_Presale_24h', (req, res) => {
    const current = Date.now()
    const before24 = current - 24 * 3600 * 1000
    Presale.find({timestamp: {$gt: before24}})
    .then(data => res.json({
        "status": "success",
        "current": current,
        "before24": before24,
        "count": data.length,        
        "data": data,         
    }))
    .catch(err => res.status(404).json(err));
});

router.get('/get_Presale_amount_24h/:address', (req, res) => {
    const current = Date.now()
    const before24 = current - 24 * 3600 * 1000
    Presale.find({timestamp: {$gt: before24}, token_address: req.params.address})
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

router.post("/add_Presale", (req, res) => {
    Presale.create(req.body)
        .then((data) => res.json({ status: "success" }))
        .catch((err) => res.json(err));
});
*/




module.exports = router;
