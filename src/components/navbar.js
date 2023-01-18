import React, { useContext } from "react";
import './navbar.css';
import { UserContext } from "../contexts/user.context";
import { Link } from "react-router-dom";

const NavbarMain = () => {
    const { user, logOutUser } = useContext(UserContext);

    const logOut = async () => {
        await logOutUser();
        window.location.reload(true);
        return;
      }
    
    const LogOutOrIn = () => {
        return user ?
            <li className="nav-item">
                <Link className="nav-link" to="/" onClick={logOut}>Logout</Link>
            </li>
            :
            <li className="nav-item">
                <Link className="nav-link" to="/login">LogIn</Link>
            </li>
            
    }

  return (
    <section className='nav-section'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light CustomNavbar">
        <Link className="navbar-brand" to="/">Eppelle Moi</Link>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/words">Words</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/test">Test</Link>
                </li>
                
                <LogOutOrIn />
            </ul>
        </div>
        </nav>
    </section>        
  );
};

export default NavbarMain;
