// model for the subscriber schema
// basically just defining the type of information that can
// be put in our database (not done by mongodb)

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// define schmea
const subscriberSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
}, {timestamps: true});

// export model
module.exports = mongoose.model('subscriberModel', subscriberSchema);