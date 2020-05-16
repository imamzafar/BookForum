import React from 'react'
import SearchForm from './SearchForm'
import ModeratorTable from './ModeratorTable'



function Admin() {
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
