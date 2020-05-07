import React from 'react'
import { useLocation, useParams} from 'react-router-dom';

function Posts() {
    let params = useParams();
    let{ handle }=useParams();
    console.log(handle)
    console.log(params)
    let location = useLocation();
    console.log(location);
    console.log(location.state.id)
    let postId = location.state.id;

    return (
        <div>
            
        </div>
    )
}

export default Posts
