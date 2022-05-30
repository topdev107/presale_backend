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



router.get('/all', (req, res) => {
    console.log('all, -0------')
    const chainId = req.query.chainId
    
    Presale.find({
        network: chainId
    })
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
    const chainId = req.query.chainId
    Presale.find({
            network: chainId
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
    const chainId = req.query.chainId
    Presale.find({
            token_owner: owner,
            network: chainId
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
    const chainId = req.query.chainId
    console.log(req.params, 'here-----------------')
    const id = req.params._id
    Presale.find({
        network: chainId,
        _id: id
    })
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
        twitterURL, githubURL, telegramURL, instagramURL, discordURL, redditURL, description, presaletype, network } = req.body;
        
    const presale = new Presale ({ token_owner, presale_addr, token_name, token_symbol, token_decimal, token_supply, token_addr, iswhitelist,
        token_presale_rate, token_listing_rate, softcap, hardcap, unsold, starttime, endtime, 
        liquidityPercent, lockupTime, maxBuy, minBuy, useVestingCont, ves_firstReleasePresale,
        ves_vestingPeriod, ves_presaleTokenRelease, useTeamVest, team_totalTeamVest, team_firstTokenReleaseMinute,
        team_firstTokenReleasePercent, team_vestingPeriod, team_teamTokenRelease, logoURL, websiteURL, facebookURL,
        twitterURL, githubURL, telegramURL, instagramURL, discordURL, redditURL, description, presaletype, network });
    presale.save()
    .then((result) => {
        res.json(result);
    })
})

module.exports = router;
