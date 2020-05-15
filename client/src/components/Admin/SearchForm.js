import React from 'react'

function SearchForm(props) {
    return (
        <div>
            <form>
                <div class="input-group">
                    <input onChange={handleInputChange} value={searchInput} type="text" class="form-control" placeholder="Search your breed"/>
                    <div class="input-group-append">
                        <button onClick={function(){ props.setResultBreed(searchInput) }} class="btn btn-outline-primary" type="button">Search</button>
                    </div>
                </div>

                <div class="mb-3">
                    <ul class="col-6 list-group">
                        { showList.map( breed =><li class="list-group-item" onClick={()=>setFormValue(breed)}>{breed}</li> )}
                    </ul>
                </div>
            </form>     
            
        </div>
    )
}

export default SearchForm
