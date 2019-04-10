const mongoose = require('mongoose');

const SiteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    clinics: {
        type: Array
    }
});

const Site = module.exports = mongoose.model('Site', SiteSchema);

module.exports.getAll = function(callback) {
    Site.find({}, callback)
}