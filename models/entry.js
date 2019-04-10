const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const EntrySchema = mongoose.Schema({
    activityID: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    dateEntered: {
        type: Date,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    },
    site: {
        type: String,
        required: true
    },
    clinic: {
        type: String,
        required: true
    },
    userStatus: {
        type: String,
        required: true
    },
    hours: {
        type: Number
    },
    members: {
        type: Number
    },
    description: {
        type: String
    }
});

const Entry = module.exports = mongoose.model('Entry', EntrySchema);

module.exports.getAll = function(callback) {
    Entry.find({},callback)
};
module.exports.getBySite = function(site, callback) {
    Entry.find({site:site},callback)
};

module.exports.addEntry = function(newEntry, callback){
    
    newEntry.save(callback)
};

