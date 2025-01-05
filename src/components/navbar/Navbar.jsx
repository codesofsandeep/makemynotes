// import React from 'react'
// import '../navbar/Navbar.css'
// import { NavLink } from 'react-router-dom'
// import LightDark from '../mode/LightDark'
// // import Pen from "../../images/feather-pen.png";
// import Pen1 from "../../images/contract.png";

// const Navbar = () => {
//   return (
//     <div className='fixed-div'>
//       <div className='navbar_div'>
//       <h2> <img src={Pen1} /> Make <span>My</span> Notes</h2>

//         <NavLink to="/" className="nav-link">
//           Home
//         </NavLink>

//         <NavLink to="/notes" className="nav-link">
//           Notes
//         </NavLink>

//         <LightDark/>
//     </div>
//     </div>
//   )
// }

// export default Navbar


import React, { useState } from 'react';
import '../navbar/Navbar.css';
import { NavLink } from 'react-router-dom';
import LightDark from '../mode/LightDark';
import Pen1 from "../../images/contract.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='fixed-div'>
      <div className='navbar_div'>
        <h2>
          <img src={Pen1} alt="pen" /> Make <span>My</span> Notes
        </h2>

        {/* Hamburger Icon */}
        <div className={`hamburger-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Navbar Links */}
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/notes" className="nav-link">
            Notes
          </NavLink>
          <LightDark />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
