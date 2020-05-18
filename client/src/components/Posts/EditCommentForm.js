import React, {useState} from 'react'


function EditCommentForm(props) {
    console.log(props.reply)
    const[ editReply, setEditReply ] = useState( {message: props.reply.message} )

    function handleEdit(e){
        e.preventDefault();
        let userEdit = e.target.value;
        setEditReply( {messsage: userEdit} );

    }
    // console.log(editReply)
    
    function handleEditSubmit(e){
        e.preventDefault();

    let EditReplyData = {
            postId:props.reply.postId,
            userId:props.reply.postId,
            replyId: _id,
            editReply: editReply.message
        } 

        props.loadPage();
    }
    
    function handleEditCancel(e){
        props.submitReply(e)
    }
    return (
        <div class="col-lg-12 mt-4">
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
