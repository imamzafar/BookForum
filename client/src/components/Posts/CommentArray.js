import React, {useState} from 'react'

const CommentArray = (props) => {
    // const [ myArray, setMyArray] = useState('')
    // let newComment = ( [{...props.comment}] )

    // console.log(props)

    return (
        <div>
            { props.comment.length !== 0 ? props.comment.map( item => <div class="row justify-content-end" >
            <div class="col-lg-12" key={item._id} style={{border:'2px solid #9f6934'}}> 
                <div class="col-lg-12 my-2">
                    <div key={item._id}><b>{item.commenterName}</b></div>
                    <div></div>
                </div>
                <div class="col-lg-12 mb-2" key={item._id}>{item.postcomment}</div>
            </div>
            
        </div>) : ''}

        </div>
       
    )
}

export default CommentArray
