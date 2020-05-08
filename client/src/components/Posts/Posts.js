import React, {useState, useEffect} from 'react'
import { useLocation, useParams} from 'react-router-dom';

function Posts() {
    const [ walkPost, setWalkPost ] = useState({});
    let params = useParams();
    let{ handle }=useParams();
    // console.log(handle) // console.log(params)
    let location = useLocation();
    // console.log(location); // 
    // console.log(location.state.id)
    let postId = location.state.id;

    async function loadPage(){
        const apiGetWalkPost = await fetch(`/api/walkpost/${postId}`).then( result => result.json() )
        // console.log(apiGetWalkPost)
        setWalkPost(apiGetWalkPost)
    }
    console.log(walkPost)
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
                    <div class="row justify-content-center">
                        <div class="col-10">
                            <h2 class="my-4">{walkPost.title}</h2>
                        </div>
                        <div class="col-10" style={{border: "1px solid #9f6934"}}>
                            <div class="row">
                                <div class="">
                                    <p>Post by:{walkPost.name}</p>
                                    <small>{walkPost.createdAt}</small>
                                </div>            
                            </div>
                            <div class="row mt-4">
                                <p>{walkPost.message}</p>
                            </div>
                            
                        </div>
                        <div class="col-10 mx-auto" style={{border: "1px solid #9f6934"}}>
                            <button style={{display:"block"}}>Reply</button></div>
                    </div>    
                </div>
            </div>
        </div>    
    )
}

export default Posts
