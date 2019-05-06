const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/* User Schema to define what the data structure
looks like for a user */
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
    displayName: {
        type: String,
        require: true
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
// Export this model as an object
const User = module.exports = mongoose.model('User', UserSchema);

// Find a user by a given id
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback)
};

// Find a user by a given username
module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
}

// Return many users by a gen username 
module.exports.searchUsersByUsername = function(username, callback) {
    const query = {username: username}
    User.find(query, callback)
}

// Add a new User to the database
module.exports.addUser = function(newUser, callback){

    bcrypt.genSalt(10, (err, salt) => {

        //Function that hash and salts the given user password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;

            //Mongoose function that saves the user to the database
            newUser.save(callback)
        })
    });
}

// Take a password and compare it to the stored hashed password
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) =>{
        if(err) throw err;
        callback(null, isMatch);
    })
}

// Update the user information
module.exports.updateProfile = function(updateInfo, callback) {
    User.findByIdAndUpdate(updateInfo.userID, 
        {$set: {
            site: updateInfo.site, 
            clinic: updateInfo.clinic, 
            status: updateInfo.status,
            displayName: updateInfo.displayName
        }},
        callback)
}