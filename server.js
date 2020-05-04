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

