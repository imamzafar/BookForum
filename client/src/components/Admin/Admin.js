import React from 'react'
import { Redirect} from 'react-router-dom';
import SearchForm from './SearchForm'
import ModeratorTable from './ModeratorTable'



const Admin = () => {

    // if(localStorage.id == ''){
    //     return <Redirect to='/login' />
    // }
    return( localStorage.id == ''? <Redirect to='/login' />: '')
    


    return (
        <div class="row">
            <div class="col-lg-12">
                <h1>The admin page</h1> 
                   <SearchForm /> 
                   <ModeratorTable/>
            </div>
                
            
            
        </div>
    )
}

export default Admin
