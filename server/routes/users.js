const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: `${req.body.firstName}.${req.body.lastName}`,
        password: req.body.password

    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg:'failed to register user...'});
        }else{
        res.json({success: true, msg:'User successfully registered!'});
        }
    })
});

//Authenticate 
router.get('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE')
});

//Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE')
});

module.exports = router;