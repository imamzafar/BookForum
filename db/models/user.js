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
    userReply: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "reply"
         }
    ],  
    img: {
        type: String,
        default: 'https://getdrawings.com/free-icon-bw/anonymous-avatar-icon-19.png'  
    },
    userType:{
        type: String,
        default: 'user'
    },  
    points:{
        type:Number,
        default: 0
    },
    MemberSince:{
        type: Number
    },
    lastActiveAt: Date
},
    {
    timestamps: true
 })

module.exports = mongoose.model('user', user);