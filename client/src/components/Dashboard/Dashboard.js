import React, {useState, useEffect} from 'react'
import { Link, useParams, useLocation} from 'react-router-dom';


function Dashboard() {
    const [ userData, setUserData] = useState('');
    const[ createdAt, setCreatedAt] = useState('');
    const[ updatedAt, setUpdatedAt] = useState('');
    const[ userPosts, setUserPosts] = useState([]);

    let id = localStorage.id;

    useEffect( function(){
        loadPage();
    }, [] );

    async function loadPage(){
        const apiUserData = await fetch(`/api/userdata/${id}`).then( result => result.json() )
        
            let created = new Date(apiUserData.createdAt).toString().substring(4, 15) 
             
            let updated = new Date(apiUserData.updatedAt).toString().substring(4, 21) 
           
        
        setUserData(apiUserData);
        setCreatedAt(created);
        setUpdatedAt(updated);
        setUserPosts(apiUserData.userThreadWalk)
        localStorage.setItem("type", apiUserData.userType)
        localStorage.setItem("points", apiUserData.points)
        
        // console.log(apiUserData)
    }
    // console.log(userData);
    


    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 mx-auto" style={{height: "50px", backgroundColor: "#9f6934", padding: "0", margin: "0"}}>
                    <h2 style={{paddingTop: "10px", paddingLeft: "15px", color:"white"}}>Dashboard</h2>
                </div>
                
                <div class="col-lg-10 mx-auto mt-4">
                    <div class="row justify-content-center mt-4 p-4" style={{boxShadow: "5px 3px #9E9E9E", border: "1px solid #9f6934"}}>
                        <div class="col-lg-3">
                            <img src={userData.img} style={{minHeight:'70px', height:'180px', padding: '10px'}} class="img-thumbnail"/>                        
                        </div>
                        <div class="col-lg-7" style={{padding: '0px' }}>
                            <div class="row">
                                    <div class="col-lg-7 pb-2" style={{padding: '0px' }}>
                                        <b>Name: </b> {userData.name}                               
                                    </div>
                                    <div class="col-lg-7 pb-2" style={{padding: '0px' }}>
                                        <b>Email: </b> {userData.email}                        
                                    </div>
                                    <div class="col-lg-7 pb-2" style={{padding: '0px' }}>
                                        <b>Points Earned: </b> {userData.points}   
                                        { userData.points < 5 ? <p class="ml-2">(Points should be atleast 5 to create a post)</p> : ''}                     
                                    </div>
                                    <div class="col-lg-7 pb-2" style={{padding: '0px' }}>
                                         {userData.points < 5 ? <div><b>Member Type: </b> NewBie</div> : <div><b>Member Type: </b> Member </div>}          
                                    </div>
                                    <div class="col-lg-7 pb-2" style={{padding: '0px' }}>
                                        <b>Joined Date: </b>{createdAt}                     
                                    </div>
                                    <div class="col-lg-7 pb-2" style={{padding: '0px' }}>
                                        <b>Last Active on: </b>{updatedAt}                      
                                    </div>
                            </div>  
                        </div>
                            

                    </div>
                </div>
                {userPosts.length != 0 ? 
                <div class="col-lg-10 mx-auto mt-4">
                    <div class="row">
                        <div class="col-lg-12">
                            <h3>Your Posts</h3>
                        </div>    
                        {userPosts.map( element => <div class="col-lg-12"><Link to={`/the-walks/${element.slug}/${element._id}`}>{element.title}</Link></div>)}
                    </div>    
                    
                </div> :
                <div class="col-lg-12">
                    No Posts to show. 
                </div> }   
            </div>  
        </div>      
    )
}

export default Dashboard
