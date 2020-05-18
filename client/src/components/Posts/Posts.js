import React, {useState, useEffect} from 'react'
import { useLocation, useParams} from 'react-router-dom';
import PostForm from './PostForm';
import CommentForm from './CommentForm';
import CommentArray from './CommentArray';


function Posts(props) {
    const [ walkPost, setWalkPost ] = useState({});
    const [ showForm, setShowForm ] = useState(false);
    const [ replyForm, setReplyForm ] = useState(false);
    const [ editForm, setEditForm ] = useState(false);
    const[ replyResult, setReplyResult ] = useState( [] )
    const[ numberReply, setNumberReply] = useState()
    const[ myLike, setMyLike ] = useState('')
    const[ myName, setMyName ] = useState('');
    const pageStyle = {
        mainPost: {boxShadow: "5px 3px #9E9E9E", border: "1px solid #9f6934", background: "#90ee90"},
        mainBtn: {display:"block", backgroundColor: 'transparent', border: 'none', color:'#9f6934', fontWeight:'bold'},
        btn: {backgroundColor: 'transparent', border: 'none', display: 'inline', color:'#9f6934', fontWeight:'bold' }
    }
   
    let params = useParams();
    let{ name }=useParams();
    // console.log(name) // console.log(params)
   
    let location = useLocation();
    // console.log(location) / console.log(props.location.myCustomProps)
    let postId = location.state.id;

    async function loadPage(){
        //get the main post of the page
        const apiGetWalkPost = await fetch(`/api/walkpost/${postId}`).then( result => result.json() )
        // console.log(apiGetWalkPost[0].comment)
        setWalkPost(apiGetWalkPost)
        setMyName(apiGetWalkPost.user.name)
        //get replies for the post
        const apiGetReply = await fetch(`/api/replydata/${postId}`).then( result => result.json() )
        // console.log([apiGetReply[0].comment])
        apiGetReply.forEach(element => { 
            element.createdAt = new Date(element.createdAt).toString().substring(4, 15)   
            element.updatedAt = new Date(element.updatedAt).toString().substring(4, 15) 
        });
        setReplyResult(apiGetReply)
        let replyArray = apiGetReply.length;
        setNumberReply(replyArray);   
        setMyLike(apiGetWalkPost.likes);     
    }
    console.log(walkPost);
    console.log('the reply result is',replyResult)
    //submitForm for the Post reply
    function submitForm(e){
        setShowForm(false);
        e.preventDefault();
    }
    
    //submit form for the comments
    function addBtnReply(e, idx){
        e.preventDefault();
        if(localStorage.id){
            setReplyForm({id: idx, state: true});
        } else 
        {
            setReplyForm({id: '', state: false});
        }
  
    }

    function submitReply(e, idx){
        setReplyForm({id: idx, state: false});
        e.preventDefault();
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
          }).then( result=>result.json());  
        //   console.log(apiLike)
    }

    function deleteBtnPost(e, idx){
        let id = e.target.id; 
        // console.log(id)
        if(localStorage.id == id){
            // console.log('do the api call')
        }
        
    }

    function editBtnPost(e, idx){
        let id = e.target.id;
        if(localStorage.id == id){
            setEditForm({id: idx, state: true});
        }else{
            setEditForm({id: '', state: false});
        }
       
    }

    async function handleDelete(e, id, userId){
        e.preventDefault();
        const apiDeletePost = await fetch(`/api/deletepost/${id}/${userId}`, 
        {   method: 'delete'
            
        })
        .then( result=>result.json()) 
        console.log(apiDeletePost)
        

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
                        <div class="col-10" style={pageStyle.mainPost}>
                            <div class="row">
                                <div class="col-lg-6">
                                    <p style={{padding: '0px'}}>{myName}</p>
                                </div>      
                                <div class="col-lg-3">
                                    <small>{walkPost.createdAt}</small>
                                </div> 
                                <div class="col-lg-3">
                                    <small>Replies:{numberReply}</small>
                                </div> 
                                <div class="col-12">
                                    <p>{walkPost.message}</p>
                                </div> 
                                <div class="col-12 mt-4">
                                    
                                </div>     
                            </div>
                        </div>
                        <div  class="col-lg-10 col-md-10 mt-2" >
                            <div class="row justify-content-start">
                                <div class="col-lg-1 col-md-1">
                                    <button style={pageStyle.btn} type="submit" onClick={e => {handleLike(e)}}><i class="fas fa-thumbs-up"></i><span class="pl-2">{myLike}</span></button>
                                </div>
                                <div class="col-lg-1 col-md-1">
                                    <button onClick={function () { localStorage.id ? setShowForm(true) : setShowForm(false)}} style={pageStyle.mainBtn}>Reply</button>
                                    { showForm ?  <PostForm submitForm={submitForm} walkPost={walkPost} loadPage={loadPage}/> : ''}
                                </div>
                                <div class="col-lg-1 col-md-1">
                                    { localStorage.id === walkPost.userId || localStorage.type === 'modertor' ? <button onClick={() => setShowForm(true)} style={pageStyle.mainBtn}>Edit</button> : '' }
                                </div>
                                <div class="col-lg-1 col-md-1">
                                    { localStorage.id === walkPost.userId || localStorage.type === 'admin'? <button onClick={ e => handleDelete(e, walkPost._id, walkPost.userId)} style={pageStyle.mainBtn}>Delete</button> : ''}
                                </div>
                            </div>

                        </div>
                        {/* <div class="col-10 mx-auto mt-2" style={{border: "1px solid #9f6934"}}>
                            <button style={pageStyle.btn} type="submit" onClick={e => {handleLike(e)}}><i class="fas fa-thumbs-up"></i><span class="pl-2">{myLike}</span></button>
                            <button onClick={() => setShowForm(true)} style={pageStyle.mainBtn}>Reply</button>
                            { showForm ?  <PostForm submitForm={submitForm} walkPost={walkPost} loadPage={loadPage}/> : ''}
                            <button onClick={() => setShowForm(true)} style={pageStyle.mainBtn}>Edit</button>
                            <button onClick={() => setShowForm(false)} style={pageStyle.mainBtn}>Delete</button>
                        </div>     */}
                    </div>    
                </div>    
            </div>
            <div class="row mt-4">
                <div class="col-lg-12">
                {replyResult.length !== 0 ? replyResult.map( (reply, idx) => <div class="row justify-content-center">
                        <div class="col-lg-10" style={{border:'2px solid #9f6934'}}>
                            {reply.createdAt}
                        </div>
                        <div class="col-lg-10">
                            <div class="row" style={{border:'1px solid #9f6934'}}>
                                <div class="col-lg-10">
                                    <div class="row">
                                        <div class="col-lg-6">{reply.user.name}</div>
                                        <div class="col-lg-4"></div>
                                    </div>        
                                </div>
                                <div class="col-lg-12 my-2" >
                                    {reply.message}
                                </div> 
                                <div class="col-lg-12" >
                                    <div class="row justify-content-end">
                                        <button class="pr-4" type="submit" id={idx} onClick={e => addBtnReply(e, idx)} style={pageStyle.btn}>Reply</button><br/>
                                        {/* { replyForm.id == idx && replyForm.state ? <CommentForm submitReply={submitReply} idx={idx} reply={reply} loadPage={loadPage}/> : ''} */}
                                        <button class="pr-4" type="submit" id={reply.userId} onClick={e => editBtnPost(e, idx)} style={pageStyle.btn}>Edit</button><br/>
                                        <button class="pr-4" type="submit" id={reply.userId} onClick={e => deleteBtnPost(e, idx)} style={pageStyle.btn}>Delete</button> <br/>
                                        { replyForm.id == idx && replyForm.state ? <CommentForm submitReply={submitReply} idx={idx} reply={reply} loadPage={loadPage}/> : ''}
                                        
                                    </div>
                                    
                                </div>
                            </div> 
                            <CommentArray comment={reply.comment} />   
                        </div>
                    </div> ) : ''}
             
                </div>    
            </div>
                        
        </div>    
    )
}

export default Posts
