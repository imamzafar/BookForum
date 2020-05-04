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
    return {
        message: "user successfully loggedin",
        id: userData._id,
        name: userData.name,
        email: userData.email,
    };
}




module.exports = { 
    loginUser,
    registerUser
}