import React, {useState} from 'react'


function EditCommentForm(props) {
    // console.log(props.reply)
    const[ editReply, setEditReply ] = useState( {message: props.reply.message} )

    function handleEdit(e){
        e.preventDefault();
        let userEdit = e.target.value;
        setEditReply( {message: userEdit} );

    }
    // console.log(editReply)
    
    async function handleEditSubmit(e){
        e.preventDefault();

    let editReplyData = {
            postId:props.reply.postId,
            userId:props.reply.postId,
            replyId:props.reply._id,
            edited: editReply.message
        } 

        const apiReply = await fetch('/api/editReply', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editReplyData)
          }).then( result=>result.json())   

    props.submitReply(e)
    props.loadPage();
    }
    
    function handleEditCancel(e){
        props.submitReply(e)  
    }

    return (
        <div class="col-lg-12 ml-2 mt-4">
            <div class="row">
                <form>
                    <textarea type="text" name="" id="message" value={editReply.message} onChange={handleEdit} placeholder="Your Message" cols="100" rows="5"></textarea><br/>
                    
                    <button class="btn myBtnPink" type="submit" onClick={handleEditSubmit}>submit</button> 
                    <button class="btn myBtnPink" type="submit" onClick={handleEditCancel}>Cancel</button> 
                </form>
            </div>
        </div>
    )
}

export default EditCommentForm
