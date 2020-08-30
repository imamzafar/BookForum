const mongoose = require('mongoose');
const bcrypt = require ( 'bcrypt' );

// mongoose.connect(`mongodb://localhost:27017/woofwoof`, {useNewUrlParser: true, useFindAndModify: false});
// mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

// const uri = `mongodb+srv://xyz:xyz@cluster0.jeuob.mongodb.net/trial?retryWrites=true&w=majority`;


mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, 
                        useCreateIndex: true, 
                        useUnifiedTopology: true });
    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log("MongoDB database connection established successfully");
    })

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

//create new walk scheema
    async function threadResult( data ){
        // console.log(data);
        const walkData = {
            userId: data.id,
            name: data.name,
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
        const postPoints = await db.user.findByIdAndUpdate({_id:data.id}, {$inc: {points: 5 }})
        
        return{
            message:"User successfully saved"
        }
}

    async function getWalkData(){
        const walkDataDb = await db.walk.find({})
                                .sort({_id:-1})
                                .limit(20)
                                .populate('userInfo', 'points userType')
                                .populate('userReply', 'name')
                               
        return walkDataDb;
        // sort({_id:-1}).limit(20)
    }

    async function getWalkPost(data){
        // console.log(data)
        const getWalkPost = await db.walk.findOne({ _id:data }).populate('userInfo', 'points userType')
        // console.log('the getwalkpost orm is', getWalkPost)
        return getWalkPost;
    }
    
    //get like data
    async function getLikeResult(data){
        // console.log(data)
        const postLikeData = await db.walk.findByIdAndUpdate({ _id:data },{$inc: { likes: 1 }})
        
        
        return {
            message: "likes updated successfuly!",
            likes: postLikeData.likes
        }
    }


    //post replies to post/thread
    async function replyData(data){
        // console.log(data.post.reply);
        // console.log('the data is', data)
       const postData = {
           userId: data.userId,
           name: data.name,
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
        const replyPoints = await db.user.findByIdAndUpdate({_id:data.userId}, {$inc: {points: 1 }})

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
    // async function counterData(number, postId){
    //     // console.log('the [orm number] is', number)
    //     const num = number.likes;
    //     const counterDataDB = await db.walk.findByIdAndUpdate({_id:postId}, {likes: num})
    //     return {
    //         message: "likes updated successfuly!"
    //     }
    // }

    //post comment
    async function commentResult(data){
        // console.log(data.post.reply);
        // console.log('the [commentResult ORM] data is', data)
        // console.log('the reply id is', data.replyId)
        // console.log('the post id is', data.postId)
       const commentData = {
            commenterId:data.userId,
            commenterName: data.name,
            postcomment: data.comment
       } 

        const postCommentToReply = await db.reply.findOneAndUpdate({ $and: [{_id:data.replyId}, {postId:data.postId}] }, {$push: {comment: commentData}}) 
        const commentIncData = await db.user.findByIdAndUpdate({ _id:data.userId },{$inc: { points: 1 }})
        return{
            message: "post submited successfully!"
        }
    }

    //get user data from the db
    async function getUsers(){
        // console.log(data)
        const getUsersData = await db.user.find({})
        // console.log('the [getusersData] orm is', getUsersData)
        return getUsersData;
    }
    //GET USER DATA 
    async function getUserData(id){
        // console.log('user id [orm] is', id)
        const getUserData = await db.user.findById(id).populate('userThreadWalk', 'title slug')
        // console.log('the [getuserData] orm is', getUserData);
        return getUserData;
    }

    //GET POINTS
    async function getPointsResult(id){
        // console.log('user id [orm] is', id)
        const getPointsData = await db.user.findById( {_id:id} )
        // console.log('the [getuserData] orm is', getUserData);
        return getPointsData.points;
    }

    //update user type admin page
    async function userTypeResult(id, userType){
        // console.log('the [orm userType] is', userType)
        const userTypeDB = await db.user.findByIdAndUpdate({_id:id}, {userType: userType.userType})
        return {
            message: "user is updated successfuly!"
        }
    }

    //delete users admin component
    async function deleteUser(id){
        // console.log('the [orm delete user] is', id)
        const userTypeDB = await db.user.findOneAndDelete({_id:id})
        return {
            message: "user is deleted successfuly!"
        }
    }

    //delete post from posts component
    async function deletePost(id, userId){
        // console.log('the [orm delete user] is', id, userId)
        const deletePostResult = await db.walk.findOneAndDelete({_id:id})
        // const deletePostFromReplyModel = await db.reply.deleteMany({ postId:id }, function(err, result) {
        //     if (err) {
        //       res.send(err);
        //     } else {
        //       res.send(result);
        //     }
        //   });
        return {
            message: "user is deleted successfuly!"
        }
    }

    //delete reply from reply model
    async function deleteReply(replyId){
        // console.log('the [orm delete reply] is', replyId)
        const deletePostReply = await db.reply.findOneAndDelete({_id:replyId})
        
        return {
            message: "reply is deleted successfuly!"
        }
    }

    async function editReplyResult(data){
        // console.log( 'editReplyResult [orm]', data)
        const postData = {
            message: data.edited
        } 

        const postEditReply = await db.reply.findOneAndUpdate({ $and: [{_id:data.replyId}, {postId:data.postId}] }, {message: data.edited}) 
        return{
            message: "reply edited successfully!"
        }
    }

    async function editPostResult(data){
        // console.log( 'editReplyResult [orm]', data)
        const postData = {
            message: data.edited
        } 

        const postEditPost = await db.walk.findOneAndUpdate({_id:data.postId}, {message: data.edited}) 
        return{
            message: "post edited successfully!"
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
    // counterData,
    commentResult,
    getUsers,
    userTypeResult, 
    deletePost,
    editReplyResult,
    editPostResult,
    deleteReply,
    getUserData,
    getLikeResult,
    getPointsResult
}