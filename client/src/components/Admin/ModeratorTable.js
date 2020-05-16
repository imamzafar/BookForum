import React, {useState, useEffect} from 'react'

function ModeratorTable() {
    const[ users, setUsers] = useState( [] );

    async function loadPage(){
        const apiGetUsers = await fetch('/api/users').then( result => result.json() );
        
        // console.log(apiGetUsers);
        // let date = Date(apiGetUsers[1].createdAt).toString().substring(0, 15)
        apiGetUsers.forEach(element => { 
            element.createdAt = new Date(element.createdAt).toString().substring(0, 15)   
            element.updateAt = new Date(element.updatedAt).toString().substring(0, 15) 
        });
        setUsers(apiGetUsers);
        // console.log(date)
    }
    console.log('[users]', users);

    useEffect( function(){
        loadPage();
    }, [] );

    return (
        <div class="row justify-content-center mt-2">
            <div class="col-lg-10 mt-4">
                <table class="table table-sm">
                                <thead>
                                    <tr style={{height: "50px", border: "3px solid #9f6934", backgroundColor: "#9f6934", padding: "0", margin: "0", color: "white"}}>
                                        <th  style={{ width:"20%" }}>Name</th>
                                       
                                        <th style={{ width: "20%" }} >Member Since</th>
                                        <th style={{ width: "20%" }} >Points</th>
                                        <th style={{ width: "20%" }} >User Type</th>
                                    </tr>
                                </thead>
                                { users.length !== 0 ? users.map( item =>
                                <tbody>
                                    <tr >
                                        <td >{item.name}                                       
                                         </td>
                                        
                                        <td>{item.createdAt}</td>
                                        <td>{item.points}</td>
                                        <td>{item.userType}</td>
                                    </tr>
                                
                                </tbody>) 
                                : ''}
                </table>
            </div>
        </div>
    )
}

export default ModeratorTable
