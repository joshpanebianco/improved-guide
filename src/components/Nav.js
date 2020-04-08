import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  NavItem
} from "react-bootstrap";


function Navigation(props) {
  const handleClick = () => {
    axios.delete('https://campaign-markt.herokuapp.com/logout', {withCredentials: true})
    .then(response => {
      console.log(props.history);

      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Link to="landingpage">
          <Navbar.Brand to="/">Project Two</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto nav-links ">
            <Link className="nav-style" to="/">
              <li>SIGN IN</li>
            </Link>
            <Link className="nav-style" to="/signup">
              <li>SIGN UP</li>
            </Link>
            <Link className="nav-style" to="/home">
              <li>HOME</li>
            </Link>
            <Link className="nav-style" to="/gallery">
              <li>GALLERY</li>
            </Link>
            <Link className="nav-style" to="/ad">
              <li>CreateAd</li>
            </Link>
            <Link className="nav-style" to="/createcompany">
              <li>CreateCompany</li>
            </Link>
          </Nav>
          {
            props.loggedInStatus
            ? <Link to='/logout' onClick={handleClick}>Log Out</Link>
            : (
              <>
                <Link to="/">
                  <Button className="mr-3" variant="dark">login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="success" to="/signup">SignUp</Button>
                </Link>
              </>
            )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
