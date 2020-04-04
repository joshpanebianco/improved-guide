import React from 'react';
// import './Nav.css';
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


// <nav className="navbar navbar-expand-lg navbar-light bg-light">
// 			<Link className="navbar-brand" to="/" > SkyFlying </Link>
// 			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
// 				<span className="navbar-toggler-icon"></span>
// 			</button>
// 			<div className="collapse navbar-collapse" id="navbarNav">
// 				<ul className="navbar-nav">
// 					<li className="nav-item">
// 						<Link className="nav-link" to="/">Home</Link>
// 					</li>
// 					<li className="nav-item">
// 						<a className="nav-link" href={serverURL}>User Panel</a>
// 					</li>
// 				</ul>
// 			</div>
// 		</nav>

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
            <Link className="nav-style" to="home">
              <li>HOME</li>
            </Link>
            <Link className="nav-style" to="survey">
              <li>SURVEY</li>
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
// <nav>
//   <h3>Logo</h3>
//   <ul className="nav-links">

//   </ul>
// </nav>
