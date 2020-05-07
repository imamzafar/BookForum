const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema ({
    name: {
        type: String,
        trim: true,
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
    },
    userThreadWalk: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "walk"
         }
      ],
    userCreated: {}
},{
    timestamps: true
 })

module.exports = mongoose.model('user', user);