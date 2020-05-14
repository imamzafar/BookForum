import React, {useState, useEffect} from 'react'

function PostForm(props) {
    // console.log(props)
    const[ myPost, setMyPost ] = useState( { reply:""} )
        
    function updatePost(e){
        e.preventDefault();
        let post = { reply: e.target.value }
        setMyPost(post)
        console.log(post);
    }

    async function handleSubmit(e){   
        e.preventDefault();
        props.submitForm(e);    

        let postData = {
            name: props.walkPost.user.name,
            postId: props.walkPost._id,
            userId: props.walkPost.userId,
            post: myPost
        }
            
        const apiReply = await fetch('/api/reply', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
          }).then( result=>result.json())   
          console.log(apiReply)
         
          props.loadPage();
    }

    // function handleCancel(e){
    //     e.preventDefault();
    //     props.submitForm();
    // }

    return (
        <div>
            {/* <div class={ alertMessage.type ? `alert alert-${alertMessage.type}` : `d-hide`} role="alert">
                {alertMessage.message}
            </div> */}
             <form class="mt-2">
                
                <textarea type="textarea" name="" id="message" value={myPost.reply} onChange={updatePost} placeholder="Your Message" cols="70" rows="5" ></textarea><br/>
                
                <button type="submit" onClick={handleSubmit}>Submit</button>  
                {/* <button type="submit" onClick={e => handleCancel}>Cancel</button>  */}
            </form>
        </div>
    )
}

export default PostForm
