import React from 'react';
import Typed from 'react-typed';

const Header = () => {
    return (
        <div className="header-wraper">
           <div className="main-info">
               <h1>Movie Grabber</h1>
               <Typed className="typed-text"
               strings={["Jito Chadha", "Gabriel Reches", "Emily Chhun", "Juan Chavez"]}
               typeSpeed={40}
               backSpeed={60}
               loop
               />
               
           </div>
        </div>
    )
}

export default Header