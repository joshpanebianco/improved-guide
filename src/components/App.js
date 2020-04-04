import React from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Home from './Home';
import Survey from './Survey';


// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container
} from "react-bootstrap";

function App() {
  return (
    <div className="App">
          <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="#home">Project Two</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
              </Nav>

                <Button href="login"className="mr-3" variant="dark">login</Button>
                <Button variant="success">SignUp</Button>

            </Navbar.Collapse>
            </Container>
      </Navbar>
      <Container>
        <LogIn />
        <SignUp />
        <Home />
        <Survey />
      </Container>

    </div>
  );
}

export default App;


// Notes from Alex
// import {Card} from "react-bootstrap"
