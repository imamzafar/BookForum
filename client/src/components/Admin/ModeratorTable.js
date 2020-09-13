import React, {useState, useEffect} from 'react'
import TableDiv from './TableDiv';


const ModeratorTable= () => {
    const[ users, setUsers] = useState( [] );

    const loadPage = async () => {
        const apiGetUsers = await fetch('/api/users').then( result => result.json() );
        
        // console.log(apiGetUsers);
        // let date = Date(apiGetUsers[1].createdAt).toString().substring(0, 15)
        apiGetUsers.forEach(element => { 
            element.createdAt = new Date(element.createdAt).toString().substring(4, 15)   
            element.updateAt = new Date(element.updatedAt).toString().substring(4, 15) 
        });
        setUsers(apiGetUsers);
        // console.log(date)
    }
    // console.log('[users]', users);

    const handlePointsChange = (e) => {
        e.preventDefault();
        setUsers( []);
        // console.log('the empyty array is', users)
       let pointsSort = users.sort( function(x, y) {
            return y.points - x.points
        });
        // console.log('sort array is', pointsSort)
        setUsers([...pointsSort])
    }
    // console.log(users);

    const handleDateChange = (e) => {
        e.preventDefault();
        setUsers( [] );
        let daysSort = users.sort( function(x, y){
            return y.MemberSince - x.MemberSince
        });

        setUsers([...daysSort])

    }
    useEffect( function(){
        loadPage();
        
    }, [] );

    return (
        <div class="row">
            <div class="col-lg-12">
            <div class="row justify-content-center mt-2">
                    <div class="col-lg-10 mt-4">
                        <table class="table table-sm">
                                <thead>
                                    <tr style={{height: "50px", border: "3px solid #9f6934", backgroundColor: "#9f6934", padding: "0", margin: "0", color: "white"}}>
                                        <th  style={{ width:"20%" }}>Name</th>
                                    
                                        <th style={{ width: "20%" }} >
                                            <form class="form-inline">
                                                <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Member Since<br/>(in days)</label>
                                                <button onClick={handleDateChange}><i class="fas fa-caret-down"></i></button>
                                            </form>      
                                        </th>
                                        <th style={{ width: "20%" }} >
                                            <form class="form-inline">
                                                <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Points</label>
                                                <button onClick={handlePointsChange}><i class="fas fa-caret-down"></i></button>
                                            </form> 
                                        
                                        </th>
                                        <th style={{ width: "20%" }} >User Type</th>
                                        <th style={{ width: "20%" }} >Action</th>
                                    </tr>
                                </thead>
                                <TableDiv users={users} loadPage={loadPage}/>
                        </table>
                    </div>
                </div>
              
               
                
            </div>
        </div>
    )
}

export default ModeratorTable
