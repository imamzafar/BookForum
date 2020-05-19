import React, {useState} from 'react'

function CommentForm(props) {
    const[ addReply, setAddReply] = useState({comment:''})
    // console.log(props.reply)
    // console.log(props.reply._id)
    let replyId = props.reply._id;
    let postId = props.reply.postId;
    // console.log(replyId, postId)

    async function updateThread(e){
        e.preventDefault();
        let userComment = e.target.value;
        console.log(userComment);
        setAddReply({comment: userComment})
    }
    // console.log(addReply);

    async function handleSubmit(e){
        e.preventDefault();
        props.submitReply(e, props.idx);

        if( addReply.comment != ''){
        let commentData = {
            postId:postId,
            userId:localStorage.id,
            name: localStorage.name,
            replyId: replyId,
            comment: addReply.comment
        }   

        const apiReply = await fetch('/api/comment/', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentData)
          }).then( result=>result.json())   
        //   console.log(apiReply)
        
        if(apiReply.message){
            props.alertSuccess('Thank You! Your comment posted sucessfully.');
        }else {
            props.alertFailure('Try again! Failed to post the message');   
        }
          //load page after the post submitted to db
          props.loadPage();
        }
        else {
            props.alertFailure('Try again! The comment form is empty')
        }     
    }
    
    function handleCancel(e){
        props.submitReply(e) 
    }

    return (
        
        <div class="col-lg-12 mt-4">
            <div class="row justify-content-end">
                <form>
                
                    <textarea type="text" name="" id="message" value={addReply.comment} onChange={updateThread} placeholder="Your Message" cols="60" rows="5"></textarea><br/>
                    
                    <button class="btn myBtnPink" type="submit" onClick={handleSubmit}>Add</button> 
                    <button class="btn myBtnPink" type="submit" onClick={handleCancel}>Cancel</button> 
                </form>
            </div>
        </div>
    )
}

export default CommentForm
