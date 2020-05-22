import React, {useState, useEffect} from 'react';
// import './Forum/style.css'
import { Link, useLocation} from 'react-router-dom';

function ForumHome() {
    let location = useLocation();
    const [ walkResult, setWalkResult ] = useState([])
    const [ totalMessages, setTotalMessages ] = useState( '' )
    const[ lastName, setLastName ] = useState ('')
    const[ lastUpdated, setLastUpdated] = useState('')
    // console.log(location)

    async function loadPage(){
        const apiGetWalk = await fetch('/api/walkdata').then( result => result.json() )
        apiGetWalk.forEach(element => { 
            element.createdAt = new Date(element.createdAt).toString().substring(4, 15)   
            element.updatedAt = new Date(element.updatedAt).toString().substring(4, 15) 
        });
        let total = 0;
        apiGetWalk.forEach(element => { 
            total = total + element.userReply.length;
        });
        setWalkResult( apiGetWalk);
        setTotalMessages(total);
        setLastName( apiGetWalk[0].user.name);
        setLastUpdated( apiGetWalk[0].updatedAt)

        }
        console.log(walkResult)
        
        useEffect( function(){
            loadPage();
        }, [] );
    
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 mx-auto" style={{height: "50px", backgroundColor: "#9f6934", padding: "0", margin: "0"}}>
                    <h2 style={{paddingTop: "10px", paddingLeft: "15px", color:"white"}}>Forum</h2>
                </div>
                <div class="col-lg-12 mx-auto">
                    <h2 class="my-4">Welcome To The Poems Forum!</h2>
                    <p>Emily Dickinson is one of America’s greatest and most original poets of all time.</p>
                </div>
                <div class="row ml-2 mt-4">
                    <div class="col-lg-10 mx-auto mt-4">
                        <div class="row py-2"  style={{backgroundColor: "#90ee90", border: "1px solid #4ee44e"}}>
                            <div class="col-lg-8 my-2">
                                    <div class="row my-auto" >
                                        <div class="col-lg-2 mt-4">
                                            <div class="mt-4" style={{width: "80px", margin: "0 auto"}}><i class="fas fa-envelope-open-text fa-5x"></i> </div>
                                        </div>
                                        <div class="col-lg-10">
                                        <Link to="/the-walks" className="nav-link" ><h3>Poems by Emily Dickinson</h3></Link>
                                            <p class="ml-3">Emily Dickinson is one of America’s greatest and most original poets of all time.</p>
                                            <p class="ml-3"><b>Discussions</b><span class="px-2">{walkResult.length}</span><b>Messages</b><span class="px-2">{totalMessages}</span></p>
                                        </div>
                                    </div>     
                            </div>          
                            <div class="col-lg-4 my-2" style={{borderLeft: "2px solid #9f6934"}}>
                                <div class="row my-auto"   >
                                    <div class="col-lg-12 ml-3 mt-4">
                                        <p><b>Latest by:</b><span class="px-2">{lastName}</span><b></b><span class="px-2">{lastUpdated}</span></p>
                                    </div>
                                    
                                </div>
                            </div> 
                        </div> 
                    </div>
                    <div class="col-lg-10 mx-auto">
                        <div class="row py-2" style={{backgroundColor: "#90ee90", border: "1px solid #4ee44e"}}>
                            <div class="col-lg-8 my-2">
                                    <div class="row my-auto" >
                                        <div class="col-lg-2">
                                            <div class="mt-4" style={{width: "80px", margin: "0 auto"}}><i class="fas fa-envelope-open-text fa-5x"></i> </div>
                                        </div>
                                        <div class="col-lg-10">
                                        <Link to="/the-walks" className="nav-link" ><h3>Life of Emily Dickinson</h3></Link>
                                            <p class="ml-3">Emily Dickinson is one of America’s greatest and most original poets of all time. </p>
                                            <p class="ml-3"><b>Discussions</b><span class="px-2">10</span><b>Messages</b><span class="px-2">10</span></p>
                                        </div>
                                    </div>     
                            </div>          
                            <div class="col-lg-4 my-2" style={{borderLeft: "2px solid #9f6934"}}>
                                <div class="row my-auto">
                                    <div class="col-lg-12  ml-3 mt-4">
                                    <p><b>Latest by:</b><span class="px-2">{lastName}</span><b></b><span class="px-2">{lastUpdated}</span></p>
                                    </div>
                                    
                                </div>
                            </div> 
                        </div> 
                    </div>
                    <div class="col-lg-10 mx-auto">
                        <div class="row py-2" style={{backgroundColor: "#90ee90", border: "1px solid #4ee44e"}}>
                            <div class="col-lg-8 my-2">
                                    <div class="row my-auto" >
                                        <div class="col-lg-2">
                                            <div class="mt-4" style={{width: "80px", margin: "0 auto"}}><i class="fas fa-envelope-open-text fa-5x"></i></div>
                                        </div>
                                        <div class="col-lg-10">
                                        <Link to="/the-walks" className="nav-link" ><h3>Movie</h3></Link>
                                            <p class="ml-3">Emily Dickinson is one of America’s greatest and most original poets of all time.</p>
                                            <p class="ml-3"><b>Discussions</b><span class="px-2">10</span><b>Messages</b><span class="px-2">10</span></p>
                                        </div>
                                    </div>     
                            </div>          
                            <div class="col-lg-4 my-2" style={{borderLeft: "2px solid #9f6934"}}>
                                <div class="row my-auto">
                                    <div class="col-lg-12  ml-3 mt-4">
                                    <p><b>Latest by:</b><span class="px-2">{lastName}</span><b></b><span class="px-2">{lastUpdated}</span></p>
                                    </div>
                                    
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ForumHome
