import React, {useState, useEffect} from 'react'


function TableDiv(props) {
    // console.log('the props is', props)
    
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
                    
                        <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                            <option selected>Choose</option>
                            <option value="1">Moderator</option>
                            <option value="2">Delete</option>
                        </select><button type="submit" style={{border: '1px solid #9f6934'}}class="btn">Submit</button>
                    </td>
                </tr> ): '' }
            
        </tbody>
    )
}

export default TableDiv
