import React from 'react';
// import './Forum/style.css'
import { Link, useLocation} from 'react-router-dom';

function ForumHome() {
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 mx-auto" style={{height: "50px", backgroundColor: "#9f6934", padding: "0", margin: "0"}}>
                    <h2 style={{paddingTop: "10px", paddingLeft: "15px", color:"white"}}>Forum</h2>
                </div>
                <div class="col-lg-12 mx-auto">
                    <h2 class="my-4">Welcome To Woof Woof!</h2>
                    <p>Woof Woof is a forum for dogs to socialize on net. Register to the forum and make new paw freinds!</p>
                </div>
                <div class="row ml-2">
                    <div class="col-lg-10 mx-auto">
                        <div class="row py-2"  style={{backgroundColor: "#90ee90", border: "1px solid #4ee44e"}}>
                            <div class="col-lg-8 my-2">
                                    <div class="row my-auto" >
                                        <div class="col-lg-2">
                                            <div style={{width: "80px", margin: "0 auto"}}><img src="https://www.svgrepo.com/show/140005/dog.svg" class="thumbnail"/> </div>
                                        </div>
                                        <div class="col-lg-10">
                                        <Link to="/the-walks" className="nav-link" ><h3>The Walks</h3></Link>
                                            <p>Discussions<span class="px-2">30</span>Messages<span class="px-2">60</span></p>
                                        </div>
                                    </div>     
                            </div>          
                            <div class="col-lg-4 my-2">
                                <div class="row my-auto">
                                    <div class="col-lg-12">
                                        <p>Latest:<span class="px-2"></span><span class="px-2">Time</span></p>
                                    </div>
                                    
                                </div>
                            </div> 
                        </div> 
                    </div>
                    <div class="col-lg-10 mx-auto">
                        <div class="row py-2" style={{backgroundColor: "#90ee90", border: "1px solid #4ee44e"}}>
                            <div class="col-lg-8 my-2">
                                    <div class="row my-auto" >
                                        <div class="col-lg-2">
                                            <div style={{width: "80px", margin: "0 auto"}}><img src="https://www.svgrepo.com/show/140005/dog.svg" class="thumbnail"/> </div>
                                        </div>
                                        <div class="col-lg-10">
                                        <Link to="/the-walks" className="nav-link" ><h3>The Treats</h3></Link>
                                            <p>Discussions<span class="px-2">30</span>Messages<span class="px-2">60</span></p>
                                        </div>
                                    </div>     
                            </div>          
                            <div class="col-lg-4 my-2">
                                <div class="row my-auto">
                                    <div class="col-lg-12">
                                        <p>Latest:<span class="px-2"></span><span class="px-2">Time</span></p>
                                    </div>
                                    
                                </div>
                            </div> 
                        </div> 
                    </div>
                    <div class="col-lg-10 mx-auto">
                        <div class="row py-2" style={{backgroundColor: "#90ee90", border: "1px solid #4ee44e"}}>
                            <div class="col-lg-8 my-2">
                                    <div class="row my-auto" >
                                        <div class="col-lg-2">
                                            <div style={{width: "80px", margin: "0 auto"}}><img src="https://www.svgrepo.com/show/140005/dog.svg" class="thumbnail"/> </div>
                                        </div>
                                        <div class="col-lg-10">
                                        <Link to="/yapping" className="nav-link" ><h3>Yapping</h3></Link>
                                            <p>Discussions<span class="px-2">30</span>Messages<span class="px-2">60</span></p>
                                        </div>
                                    </div>     
                            </div>          
                            <div class="col-lg-4 my-2">
                                <div class="row my-auto">
                                    <div class="col-lg-12">
                                        <p>Latest:<span class="px-2"></span><span class="px-2">Time</span></p>
                                    </div>
                                    
                                </div>
                            </div> 
                        </div> 
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ForumHome
