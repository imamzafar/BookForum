const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let walk = new Schema ({
    userId: {type: String},
    user: {
        name:{ type: String },
        id: { type: String },
    },
    title: String,
    message: String,
    comment: [
        {
            content: { type: String },
            userId: { type: String },
            userName: {type: String}
        }
    ]
});

module.exports = mongoose.model('walk', walk);