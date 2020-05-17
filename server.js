require('dotenv').config(); // --> process.env
const express = require( 'express' );
const fs = require('fs');
const path = require("path");
const orm = require( './db/orm.mongoose' );
// const multer  = require('multer');
const PORT = process.env.PORT || 8080;
const app = express();
var server = app.listen( PORT, function(){ console.log( `[Woof woof], http://localhost:${PORT}` ); });
app.use( express.static('client/build/') );
app.use(express.static(path.join(__dirname, "client/src/components/Genre")));
app.use( express.urlencoded({ extended: false }) );
app.use( express.json() );

//post user registration data
app.post('/api/user/registration', async function(req, res){
    const userData = req.body;
    const registerResult = await orm.registerUser( userData );
    res.send(registerResult);
})

//post user login data
app.post('/api/user/login', async function(req, res){
    const loginData = req.body;
    const loginResult = await orm.loginUser( loginData.email, loginData.password  );
    loginResult.rememberMe = req.body.rememberMe;
    res.send( loginResult );
})

//post new thread data walk page
app.post('/api/newthread', async function(req, res){
    const walkData = req.body;
    // console.log(walkData)
    const threadResult = await orm.threadResult( walkData  );
    res.send(threadResult);
})

//get data from walk model
app.get('/api/walkdata', async (req, res) => {
    const getWalkData = await orm.getWalkData();
    // console.log('the walk data is', getWalkData)
    res.json(getWalkData);
})

//get user post/thread from walk model for post page
app.get('/api/walkpost/:postId', async (req, res) => {
    const data = req.params.postId
    // console.log('the postId data is [server]', data)
    const getWalkPost = await orm.getWalkPost(data);
    res.json(getWalkPost);
})

//post user replyies to thread to reply model
app.post('/api/reply', async function(req, res){
    const postData = req.body;
    // console.log(postData)
    const replyData = await orm.replyData( postData );
    res.send(replyData);
})

//get replies for post/thread from reply data mode
app.get('/api/replydata/:postId', async (req, res) => {
    const data = req.params.postId;
    const getReplyData = await orm.getReplyData(data);
    // console.log('the postId data is [server]', data)
    res.json(getReplyData);
})

//post likes to reply model
app.post('/api/counter/:postId', async function(req, res){
    const number = req.body;
    // console.log('the [number] is', number)
    const postId = req.params.postId;
    // console.log('the [server postId] is', postId)
    const counterData = await orm.counterData( number, postId  );
    res.send(counterData);
})

//post comments to replies to reply model
app.post('/api/comment', async function(req, res){
    const commentData = req.body;
    // console.log('the [api/comment server] is', commentData)
    const commentResult = await orm.commentResult( commentData );
    res.send(commentResult);
})

//get users data from the db
app.get('/api/users', async (req, res) => {
    const getUsers = await orm.getUsers();
    // console.log('the walk data is', getWalkData)
    res.json(getUsers);
    let date = new Date(getUsers[0].startDate).toString().substring(4, 15)
    // console.log(date)
})

//updating user type in the db
app.post('/api/moderator/:id', async function(req, res){
    const id = req.params.id;
    const userType = req.body;
    console.log('the [api/moderator server] is', userType)
    const userTypeResult = await orm.userTypeResult( id, userType );
    res.send(userTypeResult);
})

//delete user 
app.delete('/api/deleteuser/:id', async(req, res) =>{
  const id = req.params.id;
  console.log('deleteuser is', id)
  
  const deleteUser = await orm.deleteUser(id);
  
  res.send(deleteUser)
  
})
