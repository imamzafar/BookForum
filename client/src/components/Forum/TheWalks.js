import React, {useState, useEffect} from 'react'
import WalkForm from './WalkForm';
import { Link, useParams} from 'react-router-dom';

function TheWalks() {
    const[showForm, setShowForm] = useState(false);
    const [ walkResult, setWalkResult ] = useState([])
   

    function submitThread(e){
        e.preventDefault();
        setShowForm( false );
    }

    async function loadPage(){
        const apiGetWalk = await fetch('/api/walkdata').then( result => result.json() )
        console.log(apiGetWalk)
        // console.log(apiGetWalk[0].user.name)
        // console.log(apiGetWalk[0]._id)
        setWalkResult(apiGetWalk)
    }
     
    useEffect( function(){
        loadPage();
    }, [] );

    console.log(walkResult)
    console.log(walkResult._id)
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 mx-auto" style={{height: "50px", backgroundColor: "#9f6934", padding: "0", margin: "0"}}>
                    <h2 style={{paddingTop: "10px", paddingLeft: "15px", color:"white"}}>Forum</h2>
                </div>
                <div class="col-lg-12 mx-auto">
                    <h2 class="my-4">The Walks</h2>
                    <p>Share your everyday walk stories! How much you walked, what did you see? whom you met? all interestin conversations.</p>
                </div>
                <div class="col-lg-10 mx-auto justify-content-end" style={{border:"1px solid black"}}>
                    <div class="row justify-content-end">
                        <button onClick={function(){setShowForm(true) }}>New Thread</button>
                        {showForm ? <WalkForm submitThread = {submitThread} loadPage= {loadPage}/> : ''}
                    </div>
                </div>
                <div>
                    <div class="row">
                        <div class="col-lg-12 mx-auto justify-content-end" style={{border:"1px solid black"}}></div>
                        
                    </div>    

                </div>
                <div class="col-lg-10 mx-auto mt-4"  >
                    
                    {/* <div class="row">
                        <div class="col-lg-4">
                            <h4 style={{paddingTop: "10px", paddingLeft: "15px", color:"white"}}>Title</h4>
                        </div>
                        <div class="col-lg-2">
                            <h4 style={{paddingTop: "10px", paddingLeft: "15px", color:"white"}}>Start Date</h4>
                        </div>
                        <div class="col-lg-2">
                            <h4 style={{paddingTop: "10px", paddingLeft: "15px", color:"white"}}>Replies</h4>
                        </div>
                        <div class="col-lg-1">
                            <h4 style={{paddingTop: "10px", paddingLeft: "15px", color:"white"}}>Views</h4>
                        </div>
                        <div class="col-lg-3">
                            <h4 style={{paddingTop: "10px", paddingLeft: "15px", color:"white"}}>Last Message</h4>
                        </div>
                    </div> */}
                        
                         <div>
                        
                            <table class="table table-sm">
                                <thead>
                                    <tr style={{height: "50px", border: "3px solid #9f6934", backgroundColor: "#9f6934", padding: "0", margin: "0", color: "white"}}>
                                        <th  style={{ width:"40%" }}>Title</th>
                                       
                                        <th style={{ width: "20%" }} >Replies</th>
                                        <th style={{ width: "20%" }} >Views</th>
                                        <th style={{ width: "20%" }} >Last Message</th>
                                    </tr>
                                </thead>
                                { walkResult.length !== 0 ? walkResult.map( event => <tbody>
                                    <tr style={{ height: '80px', border: "3px solid #9f6934" }}>
                                        <td><Link to={{ pathname: `/the-walks/${event.slug}`,
                                                            state:{id: event._id},
                                                            id: event._id }}> 
                                        {event.title} </Link><br/>
                                        name <br/>
                                        {event.createdAt}  
                                         </td>
                                        
                                        <td>john@example.com</td>
                                        <td>Doe</td>
                                        <td>Doe</td>
                                    </tr>
                                
                                </tbody>) : ''}
                            </table>
                        </div>
                </div>         
            </div>
        </div>
    )
}

export default TheWalks
