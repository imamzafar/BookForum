import React, {useState, useEffect} from 'react'
import WalkForm from './WalkForm';
import { Link, useParams, useLocation} from 'react-router-dom';

function TheWalks() {
    const location = useLocation();
    const[showForm, setShowForm] = useState(false);
    const [ walkResult, setWalkResult ] = useState([])
   
    

    function submitThread(e){
        e.preventDefault();
        setShowForm( false );
    }

    async function loadPage(){
        const apiGetWalk = await fetch('/api/walkdata').then( result => result.json() )
        console.log(apiGetWalk)
        apiGetWalk.forEach(element => { 
            element.createdAt = new Date(element.createdAt).toString().substring(4, 15)   
            element.updatedAt = new Date(element.updatedAt).toString().substring(4, 15) 
        });

        // apiGetWalk.map( element => {
        //     let lastReply = element.userReply.pop().name;
        //     console.log(lastReply)
        // }); 
        console.log(apiGetWalk[0].userReply[0])
        console.log(apiGetWalk[0].lastReply)

        // console.log(apiGetWalk[0].user.name)
        // console.log(apiGetWalk[0]._id)
        setWalkResult([...apiGetWalk])
    }
    console.log(walkResult);
    // console.log(walkResult[2].lastReply)

    function handleSubmit(e){
        e.preventDefault();
        let id = localStorage.id;
        let result = walkResult.find( ele => ele.userId === id)
        console.log('the result is', result)
        // console.log( result.userInfo[0].points)
        if(localStorage.id){
            setShowForm( true );
        }
       
        // if( result && result.userInfo[0].points > 5){
        //     setShowForm( true );
        // } else{
        //     alert('not enough points to start a thread')
        // }
        
    }
     
    useEffect( function(){
        loadPage();
    }, [] );

    // console.log(walkResult)
    // console.log(walkResult._id)
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 mx-auto" style={{height: "50px", backgroundColor: "#9f6934", padding: "0", margin: "0"}}>
                    <h2 style={{paddingTop: "10px", paddingLeft: "15px", color:"white"}}>Forum</h2>
                </div>
                <div class="col-lg-12 mx-auto">
                    <h2 class="my-4">A Long-Expected Party</h2>
                    <p>Society and habits of hobbits in general and the peculiar Baggins family in particular.</p>
                </div>
                <div class="col-lg-10 mx-auto">
                    <div class="row mx-auto justify-content-end">
                        {/* <button onClick={function(){localStorage.points > 5 ? setShowForm(true) : setShowForm(false); alert('Not enough points to start a new thread')}}>New Thread</button> */}
                        <button onClick={handleSubmit}>New Post</button><br/>
                        {showForm ? <WalkForm submitThread ={submitThread} loadPage={loadPage}/> : ''}
                    </div>
                </div>
                <div>
                    <div class="row">
                        <div class="col-lg-12 mx-auto justify-content-end" style={{border:"1px solid black"}}></div>
                        
                    </div>    

                </div>
                <div class="col-lg-10 mx-auto mt-4"  >                      
                         <div>
                        
                            <table class="table table-sm">
                                <thead>
                                    <tr style={{height: "50px", border: "3px solid #9f6934", backgroundColor: "#9f6934", padding: "0", margin: "0", color: "white"}}>
                                        <th  style={{ width:"10%" }}></th>
                                        <th  style={{ width:"30%" }}>Title</th>
                                       
                                        <th style={{ width: "20%" }} >Replies</th>
                                        <th style={{ width: "20%" }} >Views</th>
                                        <th style={{ width: "20%" }} >Last Activity</th>
                                    </tr>
                                </thead>
                                { walkResult.length !== 0 ? walkResult.map( event => <tbody>
                                    <tr style={{ height: '80px', border: "3px solid #9f6934" }}>
                                        <td style={{padding: '20px 0 0 20px'}}><i class="fas fa-envelope-open-text fa-2x"></i></td>
                                        <td style={{padding: '10px 0 0 0'}} key={event._id}>
                                            <div style={{fontSize: "25px"}}>
                                                <Link to={{ pathname: `/the-walks/${event.slug}`,
                                                                info:{id: event._id}
                                                                
                                                                }}> 
                                            <b>{event.title}</b> </Link><br/>
                                            </div>
                                            <div class="my-2">
                                                {event.user.name}<br/>
                                                {event.createdAt}  
                                            </div>
                                        
                                         </td>
                                        
                                        <td style={{padding: '20px 0 0 0'}}>{event.userReply.length}</td>
                                        <td style={{padding: '20px 0 0 0'}}>10</td>
                                        <td style={{padding: '20px 0 0 0'}}>
                                            {event.updatedAt}<br/>
                                            {/* {event.userReply.map( el => el.name)} */}
                                            {() => {return event.userReply.pop().name}}</td>
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
