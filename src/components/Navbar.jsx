import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

const Navbar = ({isAuth}) => {
  return (
    <>
    <header>
            <div className="container">
                <div id="branding">
                    <h1>Opulence by Design</h1>
                </div>
                <nav>
                    <ul>
                        {!isAuth ? (<li><a href="">Login</a></li>)
                        : (
                            <li><a href="" onClick={signUserOut}>Logout</a></li>
                        )}
                        
                    </ul>
                </nav>
            </div>
        </header>
    </>
  )
}

export default Navbar