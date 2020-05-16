import React, {useState, useEffect} from 'react'


function TableDiv(props) {
    console.log('the props is', props)
    
    return (

        <tbody>
            { props.users.length !== 0 ? props.users.map( item => 
                <tr >
                    <td >{item.name}                                       
                        </td>
                    
                    <td>{item.createdAt}</td>
                    <td>{item.points}</td>
                    <td>{item.userType}</td>
                </tr> ): '' }
            
        </tbody>
    )
}

export default TableDiv
