import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Registration from './components/Registration/Registration';
import Homepage from './components/Homepage/Homepage';
import ForumHome from './components/Forum/ForumHome';
import LoginPage from './components/Loginout/LoginPage';
import LogoutPage from './components/Loginout/LogoutPage';
import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import TheWalks from './components/Forum/TheWalks';
import Yapping from './components/Forum/Yapping';
import CoolPics from './components/Forum/CoolPics';
import Posts from './components/Posts/Posts';
import Admin from './components/Admin/Admin';


function App() {

  let id = localStorage.id;
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container-fluid" style={{minHeight: "80vh", padding: "0"}}>
        

          <Route exact path={["/", "/homepage"]} component={ForumHome} />
          {/* <Route exact path={"/forum"} component={ForumHome} /> */}
          <Route exact path="/Search" component={Search} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="user/:id" component={Dashboard} />
          <Route exact path="/the-walks" component={TheWalks} />
          <Route exact path="/yapping" component={Yapping} />
          <Route exact path="/treats" component={CoolPics} />
          <Route exact path="/the-walks/:name/:postId" component={Posts} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/user/:id" component={Dashboard}/> 
          {/* <Route exact path="/the-walks/:id" component={Posts} /> */}
        </div>
        <Footer />

      </Router>
      
    </div>
  );
}

export default App;
