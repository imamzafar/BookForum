import React, {useState, useEffect} from 'react'
import { useLocation, useParams} from 'react-router-dom';
import PostForm from './PostForm';
import CommentForm from './CommentForm';

function Posts() {
    const [ walkPost, setWalkPost ] = useState({});
    const [ showForm, setShowForm ] = useState(false);
    const [ replyForm, setReplyForm ] = useState(false);
    const[ replyResult, setReplyResult ] = useState( [] )
    const[ numberReply, setNumberReply] = useState()
    const[ myLike, setMyLike ] = useState();
   
    let params = useParams();
    let{ handle }=useParams();
    // console.log(handle) // console.log(params)
    let location = useLocation();
    let postId = location.state.id;

    async function loadPage(){
        //get the main post of the page
        const apiGetWalkPost = await fetch(`/api/walkpost/${postId}`).then( result => result.json() )
        // console.log(apiGetWalkPost)
        setWalkPost(apiGetWalkPost)

        //get replies for the post
        const apiGetReply = await fetch(`/api/replydata/${postId}`).then( result => result.json() )
        setReplyResult(apiGetReply)
        let replyArray = apiGetReply.length;
        setNumberReply(replyArray);   
        setMyLike(apiGetWalkPost.likes);     
    }
 console.log(replyResult)
    //submitForm for the Post reply
    function submitForm(e){
        e.preventDefault();
        setShowForm(false);
    }
    
    //submit form for the comments
    function addBtnReply(e, idx){
        e.preventDefault();
        setReplyForm({id: idx, state: true});
    }

    function submitReply(e, idx){
        e.preventDefault();
        setReplyForm({id: idx, state: false});
    }

    useEffect( function(){
        loadPage();
    }, [] );

    //likes counter
    async function handleLike(e){
        e.preventDefault(); 
        let counter = myLike
        counter++;
        setMyLike(counter)
       
        const likeData = {
            likes : counter
        }
       //post likes data in the db
        const apiLike = await fetch(`/api/counter/${postId}`, 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(likeData)
          }).then( result=>result.json())   
        //   console.log(apiLike)
    }

   
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
                                    <small>{walkPost.createdAt}</small><br/>
                                    <small>Replies:{numberReply}</small>
                                </div>            
                            </div>
                            <div class="row mt-4">
                                <p>{walkPost.message}</p>
                            </div>
                            <div class="row mt-4">
                                <button type="submit" onClick={e => {handleLike(e)}}>Like</button><span>{myLike}</span>
                            </div>
                            
                        </div>
                        <div class="col-10 mx-auto" style={{border: "1px solid #9f6934"}}>
                            <button onClick={() => setShowForm(true)} style={{display:"block"}}>Reply</button></div>
                            { showForm ?  <PostForm submitForm={submitForm} walkPost={walkPost} loadPage={loadPage}/> : ''}
                    </div>    
                </div>    
            </div>
            <div class="row mt-4">
                <div class="col-lg-12">
                {replyResult.map( (reply, idx) => <div class="row justify-content-center mb-2">
                        <div class="col-lg-10" style={{background: "#9f6934", border:'1px solid #9f6934'}}>
                            {reply.createdAt}
                        </div>
                        <div class="col-lg-10" style={{border:'1px solid #9f6934'}}>
                            <div class="row">
                                <div class="col-lg-6">{reply.user.name}</div>
                                <div class="col-lg-4">User Details</div>
                            </div>        
                        </div>
                        <div class="col-lg-10 mx-auto" style={{border:'1px solid #9f6934', }}>
                            {reply.message}
                        </div> 
                        <div class="col-lg-10 mx-auto" >
                            <button type="submit" id={idx} onClick={e => addBtnReply(e, idx)}>Reply</button>
                            { replyForm.id == idx && replyForm.state ? <CommentForm submitReply={submitReply} idx={idx} reply={reply} loadPage={loadPage}/> : ''}
                        </div>
                       
                    </div>)}
             
                </div>    
            </div>
                        
        </div>    
    )
}

export default Posts
