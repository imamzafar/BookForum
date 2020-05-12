import React, {useState} from 'react'

function ReplyForm(props) {
    const[ addReply, setAddReply] = useState({comment:''})
    console.log(props.replyResult)

    function updateThread(e){
        let userComment = e.target.value;
        console.log(userComment);
        setAddReply(userComment)

        let commentData = {
            // name:name,
            id:localStorage.id,
            comment: addReply.comment
        }     
    }
    console.log(addReply);

    function handleSubmit(e){
        e.preventDefault();
        props.submitReply(e);
    }

    return (
        <div>
             <form>
               
                <input type="text" name="" id="message" value={addReply.comment} onChange={updateThread} placeholder="Your Message" size="40"></input><br/>
                
                <button class="btn myBtnPink" type="submit" onClick={handleSubmit}>Add</button>  
            </form>
        </div>
    )
}

export default ReplyForm
