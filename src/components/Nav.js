import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';


function Nav() {
  return (
    <nav>
      <h3>Logo</h3>
      <ul className="nav-links">
        <Link className="nav-style" to="/">
          <li>SIGN IN</li>
        </Link>
        <Link className="nav-style" to="/signup">
          <li>SIGN UP</li>
        </Link>
        <Link className="nav-style" to="home">
          <li>HOME</li>
        </Link>
        <Link className="nav-style" to="survey">
          <li>SURVEY</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;
