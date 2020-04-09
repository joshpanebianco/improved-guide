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
                <NavDropdown title={
                    <span className="dropdown-style">{this.props.user.name}</span>
                } id="basic-nav-dropdown" className="nav-links nav-style">
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to="/ads/new">
                      Create Ad
                    </Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link as={Link} to={`/ads/company-ads/${this.props.user.company_id}`}>
                      Company Ads
                    </Nav.Link>
                  </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to="/gallery/new">
                        Create Gallery
                      </Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to={`/gallery/user-galleries/${this.props.user.id}`}>
                        My Galleries
                      </Nav.Link>
                    </NavDropdown.Item>
                    {this.props.user.admin
                      ? (
                          <NavDropdown.Item>
                            <Nav.Link as={Link} to={`/createcompany`}>
                              Create Company
                            </Nav.Link>
                          </NavDropdown.Item>
                        )
                      : (
                        console.log('ok')
                      )
                    }
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Nav.Link as={Link} to="/logout" onClick={this.handleClick}>
                        Log Out
                      </Nav.Link>
                    </NavDropdown.Item>
                </NavDropdown>
                </>
            )
            : (
              <>
                <Link to="/login">
                  <Button className="mr-3" variant="outline-light">Log In</Button>
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
