const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Activity Schema
const ActivitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    properties: {
        type: Array,
        required: true
    }
});

const Activity = module.exports = mongoose.model('Activity', ActivitySchema);

module.exports.getAllActivities = function(callback) {
    Activity.find({},callback)
}

module.exports.addActivity = function(newActivity, callback) {

    newActivity.save(callback)
}