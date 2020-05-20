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

        if (myThread.message != ''){
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
        } else {
            alert( 'message is empty ')
        }  
    }

    function handleCancel(e){
        props.submitThread(e) 
    }


    return (
        <div class="col-lg-12">
            <div class="row justify-content-center">
                <div class={ alertMessage.type ? `alert alert-${alertMessage.type}` : `d-hide`} role="alert">
                    {alertMessage.message}
                </div>
                <form>
                    <textarea type="textarea" name="" id="title" value={myThread.title} onChange={updateThread} placeholder="Title" cols="100" rows="1" ></textarea><br/>
                    <textarea type="textarea" name="" id="message" value={myThread.message} onChange={updateThread} placeholder="Your Message" cols="100" rows="5" ></textarea><br/>
                    
                    <button class="btn myBtnPink" type="submit" onClick={handleSubmit}>Add</button>  
                    <button class="btn myBtnPink" type="submit" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default WalkForm
