import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';


const LogoutPage = () => {
    const [ isLoggedOut, setIsLoggedOut ] = useState( false );

    useEffect( function(){
        // attempt to request logout (only once)
        logoutRequest();
    }, [] );

    // call the api to logout (and clear session)
    const logoutRequest = async() => {
        localStorage.id = "";
        localStorage.type = "";
        if(localStorage.email == 'april@test.com'){
            localStorage.email="";
        };
        localStorage.points = "";
        setTimeout( function(){ setIsLoggedOut(true); }, 1000 );
    }
    

    return (
        <div>
            { isLoggedOut ? <Redirect to='/login' /> : '' }
            <section class="jumbotron text-center">
                <div class="container">
                    <p class="lead text-muted">Please wait, logging out...</p>
                </div>
            </section>
        </div>
    )
}

export default LogoutPage;