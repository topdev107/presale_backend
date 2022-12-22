const express = require("express");

let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt')
let Const = require('../../../config/Const')

const router = express.Router();

const ObjectId = require("mongodb").ObjectId;

const User = require("../../../models/User");

router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;

        // Validate user input
        if (!(username && email && password)) {
            return res.status(Const.httpCodeMissingParam).json({"status": "error", "message": "All input is required."});
        }
        
        // check if user already exist
        // Validate if user exist in our database
        var oldUser = await User.findOne({"username": username});  

        if (oldUser) {
            return res.status(Const.httpCodeConflict).json({"status": "error", "message": "Username Already Exist."});
        }

        var oldUser = await User.findOne({"email": email});

        if (oldUser) {
            return res.status(Const.httpCodeConflict).json({"status": "error", "message": "Email Already Exist."});
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);        
        
        // Create user in our database
        const user = await User.create({
            'username': username,
            'email': email,
            'password': encryptedPassword
        })

        // Create token
        const token = jwt.sign(
            {
                user_id: user._id, 
                username: username,
                email: email,                
            }, 
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h"
            }
        );
        
        // save user token
        user.token = token;

        // return new user
        return res.status(Const.httpCodeSuccess).json({"status": "success", "user": user});

    } catch (err) {
        return res.status(Const.httpCodeUnknown).json({"status": "error", "message": err})
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(Const.httpCodeMissingParam).json({"status": "error", "message": "All input is required."})
        }

        // Validate if user exist in our database
        const user = await User.findOne({$or: [{"username": email}, {"email": email}]});

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                {
                    user_id: user._id,
                    username: user.username,
                    email: user.email
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h"
                }
            );

            // save user token
            user.token = token;

            // user
            return res.status(Const.httpCodeSuccess).json({"status": "success", "user": user});
        }

        return res.status(Const.httpCodeWrongParam).json({"status": "error", "message": "Invalid Credentials."});
    } catch (err) {
        return res.status(Const.httpCodeUnknown).json({"status": "error", "message": err});
    }
});

router.post('/update', async (req, res) => {
    try {
        const {email, oldpass, newpass} = req.body;

        // Validate user input
        if (!(email && oldpass && newpass)) {
            return res.status(Const.httpCodeMissingParam).json({"status": "error", "message": "All input is required."})
        }

        // Validate if user exist in our database
        const user = await User.findOne({$or: [{"username": email}, {"email": email}]});

        if (user && (await bcrypt.compare(oldpass, user.password))) {
            encryptedPassword = await bcrypt.hash(newpass, 10);        
        
            //update user password
            User.findByIdAndUpdate(user._id, {'password': encryptedPassword})
            // Presale.findByIdAndUpdate(req.params.id, req.body)
            //     .then(data => res.json({ status: "success", "data": data }))
            //     .catch(err => res.json(err));

            // user
            return res.status(Const.httpCodeSuccess).json({"status": "success", "user": user});
        }

        return res.status(Const.httpCodeWrongParam).json({"status": "error", "message": "Invalid Credentials."});
    } catch (err) {
        return res.status(Const.httpCodeUnknown).json({"status": "error", "message": err});
    }
});

module.exports = router;
