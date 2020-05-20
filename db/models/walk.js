const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let walk = new Schema ({
    userId: {type: String},
    user: {
        name:{ type: String },
        id: { type: String },
    },
    name:{ type: String },
    id: { type: String },
    title: String,
    message: String,
    slug: String,
    userReply: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "reply"
         }
      ],
    userInfo: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "user"
         }
    ],  
    comment: [
        {
            content: { type: String },
            userId: { type: String },
            userName: {type: String}
        }
    ],
    likes: Number,
},

{
    timestamps: true
 });

module.exports = mongoose.model('walk', walk);