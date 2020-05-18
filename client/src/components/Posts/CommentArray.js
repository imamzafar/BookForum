import React, {useState} from 'react'

function CommentArray(props) {
    const [ myArray, setMyArray] = useState('')

    // console.log(props.comment)

    let newComment = ( [{...props.comment}] )

    // console.log(newComment.length)
    // console.log(newComment)
    console.log(props.comment.length)

    return (
        <div>
            { props.comment.length !== 0 ? props.comment.map( item => <div class="row justify-content-end my-2" >
            <div class="col-lg-10" style={{border:'2px solid #9f6934'}}>
                <div class="col">{item.postcomment}</div>
                <div class="col">
                    <div>{item.commenterName}</div>
                    <div></div>
                </div>
            </div>
            
        </div>) : ''}

        </div>
       
    )
}

export default CommentArray
