import React,{useState} from 'react'

function WalkForm(props) {
    
    const [myThread, setMyThread] = useState( {title: "", message: ""});
    const [alertMessage, setAlertMessage] = useState( {type: "", message: ""})
       
    
    function updateThread(e){
        e.preventDefault();
       let id = e.target.id;
    //    console.log(id)
       let value = e.target.value;
    //    console.log(value)
       //spread the operator and insert the values
        let newThread =  ({ ...myThread, [id] : value})
        // console.log( newThread );
      
       setMyThread(newThread)
    }

    async function handleSubmit(e){
        e.preventDefault();
        props.submitThread(e)
        let url = myThread.title
        let newURL = url.trim().replace(/\s/g , "-").replace(/\'/g, "");
        let walkData = {
            id : localStorage.id,
            data : myThread,
            slug : newURL,
            name: localStorage.name
        }
    
        const apiThread = await fetch('/api/newthread', 
            {   method: 'post'
            ,
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(walkData)
          }).then( result=>result.json())   
        
          if(apiThread.message){
              setAlertMessage({type: 'success', message: apiThread.message})
              setTimeout( function(){ setAlertMessage( {} ); }, 1000 );
          } else {
            setAlertMessage({type: 'danger', message: apiThread.message})
            setTimeout( function(){ setAlertMessage({}); }, 1000 );
          }
          props.loadPage();
    }


    return (
        <div>
            <div class={ alertMessage.type ? `alert alert-${alertMessage.type}` : `d-hide`} role="alert">
                {alertMessage.message}
            </div>
             <form>
                <input type="text" name="" id="title" value={myThread.title} onChange={updateThread} placeholder="Title" size="40"></input><br/>
                <input type="text" name="" id="message" value={myThread.message} onChange={updateThread} placeholder="Your Message" size="40"></input><br/>
                
                <button class="btn myBtnPink" type="submit" onClick={handleSubmit}>Add</button>  
            </form>
        </div>
    )
}

export default WalkForm
