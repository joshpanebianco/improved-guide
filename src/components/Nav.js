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
        <Link to="/landingpage">
          <Navbar.Brand to="/">Markt</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto nav-links ">
            <Nav.Link as={Link} to="/explore">
              EXPLORE
            </Nav.Link>
          </Nav>
          {
            props.loggedInStatus
            ? (
                <>
                <NavDropdown title={props.user.name} id="nav-dropdown" className="nav-links">
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to="/ads/new">
                      CREATE AD
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to={`/ads/${props.user.company_id}`}>
                      COMPANY ADS
                    </Nav.Link>
                  </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to="/gallery/new">
                        CREATE GALLERY
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to={`/gallery/${props.user.id}`}>
                        MY GALLERIES
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to="/company/new">
                        CREATE COMPANY
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to="/logout" onClick={handleClick}>
                        Log Out
                      </Nav.Link>
                    </NavDropdown.Item>
                </NavDropdown>
                </>
            )
            : (
              <>
                <Link to="/">
                  <Button className="mr-3" variant="dark">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline-light" to="/signup">Sign Up</Button>
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
