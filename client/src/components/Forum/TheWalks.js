import React, {useState, useEffect} from 'react'
import WalkForm from './WalkForm';
import { Link, useParams, useLocation} from 'react-router-dom';


function TheWalks() {
    const location = useLocation();
    const[showForm, setShowForm] = useState(false);
    const [ walkResult, setWalkResult ] = useState([])
    const [alertMessage, setAlertMessage] = useState( {type: "", message: ""})
   
    
    function submitThread(e){
        e.preventDefault();
        setShowForm( false );
    }

    function alertSuccess(msg){
        setAlertMessage({type: 'success', message: msg})
        setTimeout( function(){ setAlertMessage( {} ); }, 2000 );
    }

    //passing data from child to parent
    function alertFailure(msg){
        setAlertMessage({type: 'danger', message: msg})
        setTimeout( function(){ setAlertMessage({}); }, 2000 );
    }

    async function loadPage(){
        const apiGetWalk = await fetch('/api/walkdata').then( result => result.json() )
        // console.log(apiGetWalk)
        apiGetWalk.forEach(element => { 
            element.createdAt = new Date(element.createdAt).toString().substring(4, 15)   
            element.updatedAt = new Date(element.updatedAt).toString().substring(4, 15) 
        });

        // apiGetWalk.map( element => {
        //     element.userReply = element.userReply.pop();
        //     // console.log(lastReply)
        // }); 
        // console.log(apiGetWalk[0].userReply[0])
        // console.log(apiGetWalk[0].lastReply)

        setWalkResult([...apiGetWalk])
    }
    // console.log(walkResult);

    function handleSubmit(e){
        e.preventDefault();
        let id = localStorage.id;
        let result = walkResult.find( ele => ele.userId === id)
        // console.log('the result is', result)
        if(localStorage.type == "admin"){
            setShowForm( true );
        }       
        if( result && result.userInfo[0].points > 5){
            setShowForm( true );
        } if( !localStorage.id ){
            alertFailure('Dear guest, feel free to visit, to participate please register')
        }  
        if(result && result.userInfo[0].points < 5){
            alertFailure('Not Enough Points to Participate in the forum. Check your dashboard.')
        }
        
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
                <div class="row mx-auto">
                    <div class={alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide'  } role="alert" >
                        {alertMessage.message}
                    </div>
                </div>
                <div class="col-lg-12 mx-auto">
                    <h2 class="my-4">Poems by Emily Dickinson</h2>
                    <p>Like most writers, Emily Dickinson wrote about what she knew and about what intrigued her. </p>
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
                                       
                                        <th class="text-center" style={{ width: "20%" }} >Replies</th>
                                        <th class="text-center" style={{ width: "20%" }} >Views</th>
                                        <th class="text-center" style={{ width: "20%" }} >Last Activity</th>
                                    </tr>
                                </thead>
                                { walkResult.length !== 0 ? walkResult.map( event => <tbody>
                                    <tr style={{ height: '80px', border: "3px solid #9f6934" }}>
                                        <td style={{padding: '20px 0 0 20px'}}><i class="fas fa-envelope-open-text fa-2x"></i></td>
                                        <td style={{padding: '10px 0 0 0'}} key={event._id}>
                                            <div style={{fontSize: "25px"}}>
                                                <Link to={{ pathname: `/the-walks/${event.slug}/${event._id}`,
                                                                info:{id: event._id}
                                                                
                                                                }}> 
                                            <b>{event.title}</b> </Link><br/>
                                            </div>
                                            <div class="my-2">
                                                {event.user.name}<br/>
                                                {event.createdAt}  
                                            </div>
                                        
                                         </td>
                                        
                                        <td class="text-center" style={{padding: '20px 0 0 0'}}>{event.userReply.length}</td>
                                        <td class="text-center" style={{padding: '20px 0 0 0'}}>10</td>
                                        <td class="text-center" style={{padding: '20px 0 0 0'}}>
                                            {event.updatedAt}<br/>
                                            {/* {event.userReply.map( el => el.name)}</td> */}
                                            {function() 
                                                {event.userReply.pop();
                                                return event.userReply[0].name; }}</td>
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
