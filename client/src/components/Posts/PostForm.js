import React, {useState, useEffect} from 'react'

function PostForm(props) {
    // console.log(props)
    const[ myPost, setMyPost ] = useState( { reply:""} )
    
        
    function updatePost(e){
        e.preventDefault();
        let post = { reply: e.target.value }
        setMyPost(post)
        // console.log(post);
    }

    async function handleSubmit(e){   
        e.preventDefault();
        props.submitForm(e);    
        let userId = localStorage.id;

        if( myPost.reply != ''){

        let postData = {
            name: localStorage.name,
            postId: props.walkPost._id,
            userId: localStorage.id,
            post: myPost
        }
            
        const apiReply = await fetch('/api/reply', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
          }).then( result=>result.json()) ; 
        //   console.log(apiReply.message);
         
            if(apiReply.message){
                props.alertSuccess('Thank You! Your reply posted sucessfully.');
                
            } else {
                props.alertFailure('Try again! Failed to post the message');
            
            }
          props.loadPage();
        }
        else{
            props.alertFailure('Reply is empty');
        }  
    }

    function handleCancel(e){
        props.submitForm(e);  
    }
    // function handleCancel(e){
    //     e.preventDefault();
    //     props.submitForm();
    // }

    return (
        <div>
            
             <form class="mt-2">
                
                <textarea type="textarea" name="" id="message" value={myPost.reply} onChange={updatePost} placeholder="Your Message" cols="100" rows="5" ></textarea><br/>
                
                <button type="submit" onClick={handleSubmit}>Submit</button>  
                <button type="submit" onClick={handleCancel}>Cancel</button>
                {/* <button type="submit" onClick={e => handleCancel}>Cancel</button>  */}
            </form>
        </div>
    )
}

export default PostForm
