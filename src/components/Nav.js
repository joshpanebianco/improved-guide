import React, {Component} from 'react';
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
  NavItem,
} from "react-bootstrap";


class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  handleClick = () => {
    axios.delete('https://campaign-markt.herokuapp.com/logout', {withCredentials: true})
    .then(response => {

      this.props.handleLogout()
      this.props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  createCompany = () => {
    if (this.props.user.admin)
      return (
          <NavDropdown.Item as={Link} to="/createcompany">
              CREATE COMPANY
          </NavDropdown.Item>
      )
  }

  render() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Link to="landingpage">
          <Navbar.Brand to="/" className="logo">Makrt</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto nav-links ">
            <Nav.Link as={Link} to="/explore">
              EXPLORE
            </Nav.Link>
          </Nav>
          {
            this.props.loggedInStatus
            ? (
                <>
                <NavDropdown title={this.props.user.name} id="nav-dropdown" className="nav-links">
                  <NavDropdown.Item as={Link} to="/ads/new">
                    {/* <Nav.Link as={Link} to="/ads/new"> */}
                      CREATE AD
                    {/* </Nav.Link> */}
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={`/ads/${this.props.user.company_id}`}>
                    {/* <Nav.Link as={Link} to={`/ads/${this.props.user.company_id}`}> */}
                      COMPANY ADS
                    {/* </Nav.Link> */}
                  </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/gallery/new">
                      {/* <Nav.Link as={Link} to="/gallery/new"> */}
                        CREATE GALLERY
                      {/* </Nav.Link> */}
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/ad/new">
                      {/* <Nav.Link as={Link} to="/ad/new"> */}
                        MY GALLERIES
                      {/* </Nav.Link> */}
                    </NavDropdown.Item>
                    {/* {this.props.user.admin ? (
                      <NavDropdown.Item as={link} to="/createcompany">
                        CREATE COMPANY
                      </NavDropdown.Item>
                    )
                      : (
                        console.log('ok')
                      )
                    } */}
                    {this.createCompany()}

                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/logout" onClick={this.handleClick}>
                      {/* <Nav.Link as={Link} to="/logout" onClick={this.handleClick}> */}
                        Log Out
                      {/* </Nav.Link> */}
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
}}

export default Navigation;
