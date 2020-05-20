import React, {useState} from 'react'
import { Link, useLocation} from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const [isShown, setShown] = useState(false);
    let showClass = !isShown ? `collapse navbar-collapse`: `collapse navbar-collapse show`;

    let id = localStorage.id
    let userName = localStorage.name;

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand" href="#">Book <i class="fas fa-book-reader"></i> Book</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={()=>setShown(!isShown)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                 <div className={showClass} id="navbarNav"> 
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" >Home</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link to="/forum" className="nav-link" href="#">Forum</Link>
                    </li> */}
                    {/* <li className="nav-item">
                        <Link to="/search" className="nav-link" href="#">Search</Link>
                    </li> */}
                    { !localStorage.id ?
                    <li className="nav-item">
                        <Link to="/registration" className="nav-link" href="#">Register</Link>
                    </li> : ''}
                    { id == "5ec39c638bbb23337445c8d5" ?
                    <li className="nav-item">
                        <Link to="/admin" className="nav-link" href="#">Admin</Link>
                    </li> : ''}
                    { !id ? 
                    <li className="nav-item">
                    <Link to="/login" className="nav-link" href="#">Login</Link>
                    </li> : 
                    <li className="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="mr-1"><i class="fas fa-user"></i></span> {`${userName}`}
                    </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link to={`/user/${id}`} className="nav-link" href="#">Dashboard</Link>
                            <div class="dropdown-divider"></div>
                            <Link to="/logout" className="nav-link" href="#">Logout</Link>
                        </div>
                    </li>}
                    </ul>
                </div>
                </nav>
            
        </div>
    )
}

export default Navbar
