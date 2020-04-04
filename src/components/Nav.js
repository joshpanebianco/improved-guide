import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
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


function Navigation() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
    <Container>
      <Navbar.Brand to="/">Project Two</Navbar.Brand>
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
            <Link className="nav-style" to="/survey">
              <li>SURVEY</li>
            </Link>
            <Link className="nav-style" to="/campaign">
              <li>CAMPAIGN</li>
            </Link>
        </Nav>

          <Button className="mr-3" variant="dark">login</Button>
          <Button variant="success">SignUp</Button>

      </Navbar.Collapse>
      </Container>
</Navbar>
  );
}

export default Navigation;
