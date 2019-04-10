const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    site: {
        type: String
    },
    clinic: {
        type: String
    },
    status: {
        type: String
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback)
};

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.searchUsersByUsername = function(username, callback) {
    const query = {username: username}
    User.find(query, callback)
}

module.exports.addUser = function(newUser, callback){

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback)
        })
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        if(err) throw err;
        callback(null, isMatch);
    })
}

module.exports.updateProfile = function(updateInfo, callback) {
    User.findByIdAndUpdate(updateInfo.userID, 
        {$set: {
            site: updateInfo.site, 
            clinic: updateInfo.clinic, 
            status: updateInfo.status
        }}, 
        callback)
}