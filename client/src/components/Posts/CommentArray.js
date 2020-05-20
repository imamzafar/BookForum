import React, {useState} from 'react'

function CommentArray(props) {
    const [ myArray, setMyArray] = useState('')
    let newComment = ( [{...props.comment}] )

    // console.log(props.comment.length)

    return (
        <div>
            { props.comment.length !== 0 ? props.comment.map( item => <div class="row justify-content-end" >
            <div class="col-lg-12" style={{border:'2px solid #9f6934'}}> 
                <div class="col-lg-12 my-2">
                    <div><b>{item.commenterName}</b></div>
                    <div></div>
                </div>
                <div class="col-lg-12 mb-2">{item.postcomment}</div>
            </div>
            
        </div>) : ''}

        </div>
       
    )
}

export default CommentArray
