const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database')

const User = require('../../models/user');

//This module catches http requests and sends a response

/*
Register Post request
Use Case: The user will fillout the necessary information for
registration and the front end will send a post request.
The body will contain all of the user information.
*/
router.post('/register', (req, res, next) => {
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        site: 'default',
        clinic: 'default',
        status: 'temp'
        
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg:'failed to register user...'});
        }else{
        res.json({success: true, msg:'User successfully registered!'});
        }
    })
});

/*
update profile post request
Use Case: The frontend will format an update to a specific user's information.
The request body should have a userID, site, clinic, and status for the update

*/
router.post('/updateProfile', (req, res, next) => {
    const updateInfo = {
        userID: req.body.userID,
        site: req.body.site,
        clinic: req.body.clinic,
        status: req.body.status
    };

    User.updateProfile(updateInfo, (err) => {
        if(err) {
            res.json({success: false, msg:'server: Failed to update profile'})
        }else{
            res.json({success: true, msg:'server: User Profile Updated'})
        }
    })
})
/*
Authentication post request
Use Case: The front end will call this url to log users in.
A username and password will be in the request body.
If the password is correct, a javascript web token will be passed back
in the response along with the user data minus the password
*/
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username||'', (err, user) => {
        if(err) throw err;

        if(!user) {
            return res.json({success:false, msg:'User not found...'})
        }

        User.comparePassword(password, user.password||'', (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data:user}, config.secret, {
                    expiresIn: 604800, //1 week in seconds
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        site: user.site,
                        clinic: user.clinic,
                        userPermission: user.status
                    }
                });
            }else {
                return res.json({success: false, msg: 'Wrong password...'})
            }
        });
    })
});

/*
Profile get requst
Use Case: To get the user's profile information. If they pass authentication,
the response will contain the specified user information
*/
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

/* 
Check for Existing User
Use Case: This post request takes a username in a request and returns
True or False. Typically used for registration to prevent the duplication of users
*/
router.post('/existingUserCheck', (req, res, next) => {
    const username = req.body.username;

    User.getUserByUsername(username||'', (err, user)=> {
        if(err) throw err;
        if(!user){
            return res.json({sucess:true, existingUser: false})
        }else {
            return res.json({sucess: true, existingUser: true})
        }
    })
});

module.exports = router;