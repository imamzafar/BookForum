import React, {useState} from 'react'

function EditPost(props) {
    console.log(props.walkPost)
    const[ editPost, setEditPost ] = useState( {message:props.walkPost.message}  )


    function editThread(e){
        e.preventDefault();
        let postEdit = e.target.value;
        setEditPost( {message: postEdit} );
    }

    async function handleSubmit(e){
        e.preventDefault();
        let editPostData = {
            postId:props.walkPost._id,
            userId:props.walkPost.userId,
            edited: editPost.message
        } 

        const apiReply = await fetch('/api/editPost', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editPostData)
          }).then( result=>result.json())   

    props.submitForm(e)
    props.loadPage();
    }

    function handleCancel(e){
        
        props.submitForm(e)
        e.preventDefault();
    }

    return (
        <div>
             <div class="col-lg-12 ml-2">
                <div class="row justify-content-center">
                    {/* <div class={ alertMessage.type ? `alert alert-${alertMessage.type}` : `d-hide`} role="alert">
                        {alertMessage.message}
                    </div> */}
                    <form>
                        
                        <textarea type="textarea" name="" id="message" value={editPost.message} onChange={editThread} placeholder="Your Message" cols="100" rows="5" ></textarea><br/>
                        
                        <button class="btn myBtnPink" type="submit" onClick={handleSubmit}>Submit</button>  
                        <button class="btn myBtnPink" type="submit" onClick={handleCancel}>Cancel</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default EditPost
