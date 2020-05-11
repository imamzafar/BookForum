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

app.post('/api/user/registration', async function(req, res){
    const userData = req.body;
    const registerResult = await orm.registerUser( userData );
    res.send(registerResult);
})

app.post('/api/user/login', async function(req, res){
    const loginData = req.body;
    const loginResult = await orm.loginUser( loginData.email, loginData.password  );
    loginResult.rememberMe = req.body.rememberMe;
    res.send( loginResult );
})

app.post('/api/newthread', async function(req, res){
    const walkData = req.body;
    // console.log(walkData)
    const threadResult = await orm.threadResult( walkData  );
    res.send(threadResult);
})

app.get('/api/walkdata', async (req, res) => {
    const getWalkData = await orm.getWalkData();
    // console.log('the walk data is', getWalkData)
    res.json(getWalkData);
})

app.get('/api/walkpost/:postId', async (req, res) => {
    const data = req.params.postId
    // console.log('the postId data is [server]', data)
    const getWalkPost = await orm.getWalkPost(data);
    res.json(getWalkPost);
})

app.post('/api/reply', async function(req, res){
    const postData = req.body;
    // console.log(postData)
    const replyData = await orm.replyData( postData );
    res.send(replyData);
})

app.get('/api/replydata/:postId', async (req, res) => {
    const data = req.params.postId;
    const getReplyData = await orm.getReplyData(data);
    // console.log('the postId data is [server]', data)
    res.json(getReplyData);
})

app.post('/api/counter/:postId', async function(req, res){
    const number = req.body;
    const postId = req.body.params;
    // console.log(postData)
    const counterData = await orm.counter( number, postId  );
    res.send(counterData);
})
