import React, { useContext } from "react";
import './navbar.css';
import { UserContext } from "../contexts/user.context";

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
                <a className="nav-link" href="/" onClick={logOut}>Logout</a>
            </li>
            :
            <li className="nav-item">
                <a className="nav-link" href="/login">LogIn</a>
            </li>
            
    }

  return (
    <section className='nav-section'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light CustomNavbar">
        <a className="navbar-brand" href="/">Eppelle Moi</a>
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
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/words">Words</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/test">Test</a>
                </li>
                
                <LogOutOrIn />
            </ul>
        </div>
        </nav>
    </section>        
  );
};

export default NavbarMain;
