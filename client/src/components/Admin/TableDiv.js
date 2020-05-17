import React, {useState, useEffect} from 'react'


function TableDiv(props) {
    const[ myOption, setMyOption] = useState('')
    console.log('the props is', props)

    function handleChange(e){
        console.log('i am cliecked[handlechange]')
        e.preventDefault();
        console.log(e.target.value)
        setMyOption(e.target.value);
    }
   console.log(myOption)
    async function handleSubmit(e){
        e.preventDefault();
        console.log(e.target)

        if( myOption == "moderator" || myOption == "admin" ){
            let id = e.target.id;
            // console.log('the id is', id)
            let data = {
                userType: myOption
            }
            const apiModerator = await fetch(`/api/moderator/${id}`, 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
          }).then( result=>result.json()) 
          console.log(apiModerator)
          props.loadPage();
        }
        if ( myOption == "Delete" ){
            let id = e.target.id;
            const apiDeleteUser = await fetch(`/api/deleteuser/${id}`, 
            {   method: 'delete'
                
            })
            .then( result=>result.json()) 
            console.log(apiDeleteUser)
        }

    }
    
    return (

        <tbody>
            { props.users.length !== 0 ? props.users.map( item => 
                <tr >
                    <td >{item.name}                                       
                        </td>
                    
                    <td>{item.createdAt}</td>
                    <td>{item.points}</td>
                    <td>{item.userType}</td>
                    <td>
                        <form>
                            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={handleChange}>
                                <option selected>Choose</option>
                                <option value="moderator">Moderator</option>
                                <option value="admin">Admin</option>
                                <option value="delete">Delete</option>
                            </select>
                            <input type="submit" id={item._id} onClick={handleSubmit} style={{border: '1px solid #9f6934'}}class="btn" value="submit"/>
                        </form>                    
                        
                    </td>
                </tr> ): '' }
            
        </tbody>
    )
}

export default TableDiv
