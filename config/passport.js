const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport) {
    let options = [];

    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    
    /* The secret key in the configuration file. The token is signed
    with the key.
    */
    options.secretOrKey = config.secret;

    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        //use the id in the payload to get the full user information
        User.getUserById(jwt_payload.data._id, (err, user) => {
            if(err){
                return done(err, false);
            }
            //if a user is found
            if(user){
                return done(null, user);
            }else {
                return done(null, false);
            }
        })
    }));
}