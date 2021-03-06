const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database')

const User = require('../../models/user');

//Register
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
//Authenticate 
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

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

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