import React, {useState, useEffect} from 'react'


const TableDiv = (props) =>{
    const[ myOption, setMyOption] = useState('')
    // console.log('the props is', props.users)

    let newUsers = ([...props.users])
    
    newUsers.forEach( element => {
        element.MemberSince = (new Date(element.updatedAt).getTime() - new Date(element.createdAt).getTime())/ ( 1000 * 3600 * 24 )
        element.MemberSince = Math.floor(element.MemberSince)
    
    })
    // console.log(newUsers)
    // props.users.forEach( element => {
    //     element.memberSince = ( element.createdAt.getTime() - element.updatedAt.getTime() )/( 1000 * 3600 * 24 )
    // })

    const handleChange = (e) => {
        e.preventDefault();
        // console.log(e.target.value)
        setMyOption(e.target.value);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(e.target)

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
                    
                    <td>{item.MemberSince}</td>
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
