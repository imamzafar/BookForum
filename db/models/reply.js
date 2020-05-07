const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reply = new Schema ({
    userId: {type: String},
    user: {
        name:{ type: String },
        id: { type: String },
    },
    message:String,
},
{
    timestamps: true
});

module.exports = mongoose.model('reply', reply);