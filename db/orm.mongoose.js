const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

mongoose.connect(`mongodb://localhost:27017/woofwoof`, {useNewUrlParser: true, useFindAndModify: false});
const db = require( './models' );

async function registerUser( userData ){
    if( !userData.password || !userData.name || !userData.email){
        return{ message: 'Invalid user data', id: "", name: "" }
    }
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(userData.password, saltRounds);    
    const saveData ={
        name: userData.name,
        email: userData.email,
        password: passwordHash
    };

    //why new db.user
    const dbUser = new db.user( saveData )
    const saveUser = await dbUser.save();
    
    return{
        message: "User successfully saved", 
        id: saveUser._id,
        email: saveUser.email,
        name: saveUser.name 
    }
}

    async function loginUser( email, password ){
        const userData = await db.user.findOne({ email: email });
        if( !userData ){
            return { error: "Couldn't find that email. Register or try again!" };
        }
        const isValidPassword = await bcrypt.compare( password, userData.password );
        if( !isValidPassword ) {
        return { error: "Invalid password" };
    }
    // console.log(userData)
    return {
        message: "user successfully loggedin",
        id: userData._id,
        name: userData.name,
        email: userData.email,
        img: userData.img,
        points: userData.points,
        type:userData.userType
    };
}

//create new walk scheemaco
    async function threadResult( data ){
        // console.log(data);
        const walkData = {
            userId: data.id,
            user: {name:data.name, id:data.id },
            slug: data.slug,
            title: data.data.title,
            message: data.data.message
        }      
        const newData = new db.walk( walkData )
        const saveData = await newData.save();
        let walkId = saveData._id
        // console.log(walkId)
        const updateUserWalksinUserSchema = await db.user.findByIdAndUpdate({_id:data.id}, {$push: {userThreadWalk: saveData._id}})
        const updateUserDatainWalkSchema = await db.walk.findByIdAndUpdate({_id:walkId}, {$push: {userInfo: data.id}})
        return{
            message:"User successfully saved"
        }
}

    async function getWalkData(){
        const walkDataDb = await db.walk.find({})
                                .sort({_id:-1})
                                .limit(20)
                                .populate('userInfo', 'points userType')
                               
        return walkDataDb;
        // sort({_id:-1}).limit(20)
    }

    async function getWalkPost(data){
        // console.log(data)
        const getWalkPost = await db.walk.findOne({ _id:data }).populate('userInfo', 'points userType')
        // console.log('the getwalkpost orm is', getWalkPost)
        return getWalkPost;
    }

    //post replies to post/thread
    async function replyData(data){
        // console.log(data.post.reply);
        // console.log('the data is', data)
       const postData = {
           userId: data.userId,
           user: { name: data.name},
           message: data.post.reply,
           postId: data.postId,
       } 
        const replyData = new db.reply( postData )
        const saveData = await replyData.save();
        let replyId = saveData._id
        const updateUserReplyinWalkSchema = await db.walk.findByIdAndUpdate({_id:data.postId}, {$push: {userReply: saveData._id}}) 
        // console.log(saveData);
        const updateUserDatainReplySchema = await db.reply.findOneAndUpdate({_id:replyId}, {$push: {userInfo: data.UserId}})
        return{
            message: "post submited successfully!"
        }
    }

    //get replies from 
    async function getReplyData(data){
        // console.log( 'the [orm] id is', data)
        const replyDataDb = await db.reply.find({postId:data}).limit(20).populate('userInfo', 'points userType')
        // console.log('the walkdata orm is', walkDataDb)
        return replyDataDb;
        // sort({_id:-1}).limit(20)
    }

    //updates likes in the model in reply
    async function counterData(number, postId){
        // console.log('the [orm number] is', number)
        const num = number.likes;
        const counterDataDB = await db.walk.findByIdAndUpdate({_id:postId}, {likes: num})
        return {
            message: "likes updated successfuly!"
        }
    }

    async function commentResult(data){
        // console.log(data.post.reply);
        console.log('the [commentResult ORM] data is', data)
        console.log('the reply id is', data.replyId)
        console.log('the post id is', data.postId)
       const commentData = {
            commenterId:data.userId,
            commenterName: data.name,
            postcomment: data.comment
       } 

        const postCommentToReply = await db.reply.findOneAndUpdate({ $and: [{_id:data.replyId}, {postId:data.postId}] }, {$push: {comment: commentData}}) 
        return{
            message: "post submited successfully!"
        }
    }

module.exports = { 
    loginUser,
    registerUser,
    threadResult,
    getWalkData,
    getWalkPost,
    replyData, 
    getReplyData,
    counterData,
    commentResult
}