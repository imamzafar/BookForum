import React, {useState, useEffect} from 'react'

function ModeratorTable() {
    const[ users, setUsers] = useState( [] );

    async function loadPage(){
        const apiGetUsers = await fetch('/api/users').then( result => result.json() );
        setUsers(apiGetUsers);
        console.log(apiGetUsers);

    }
    console.log(users);

    useEffect( function(){
        loadPage();
    }, [] );

    return (
        <div>
            <table class="table table-sm">
                                <thead>
                                    <tr style={{height: "50px", border: "3px solid #9f6934", backgroundColor: "#9f6934", padding: "0", margin: "0", color: "white"}}>
                                        <th  style={{ width:"40%" }}>Title</th>
                                       
                                        <th style={{ width: "20%" }} >Replies</th>
                                        <th style={{ width: "20%" }} >Views</th>
                                        <th style={{ width: "20%" }} >Last Activity</th>
                                    </tr>
                                </thead>
                                {/* { walkResult.length !== 0 ? walkResult.map( event => */}
                                <tbody>
                                    <tr >
                                        <td >Name<br/>
                                        Event 
                                         </td>
                                        
                                        <td>Length</td>
                                        <td>Doe</td>
                                        <td>John</td>
                                    </tr>
                                
                                </tbody>) 
                                {/* : ''} */}
                            </table>
            
        </div>
    )
}

export default ModeratorTable
