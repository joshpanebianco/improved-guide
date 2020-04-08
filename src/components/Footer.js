import React, { Component } from 'react';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  NavItem,
	Row,
	Col,
} from "react-bootstrap";



class Footer extends Component {
  render() {
    return (
      <div className="footer-area">

				<div className="footer bg-primary text-center shadow"></div>
				<div className="copyright bg-dark text-center py-2">
					<p className="text-center">© 2020 Copyright: SEI-36</p>
				</div>
      </div>
    );
  }
}


export default Footer;
