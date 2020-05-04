const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema ({
    name: {
        type: String,
        trum: true,
        required: true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

module.exports = mongoose.model('user', user);