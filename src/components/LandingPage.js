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


class LandingPage extends Component {
  render() {
    return (
      <div>
				<div className="hero-image">
        
        </div>

				<div className="quote-section my-5">
					<blockquote className="blockquote text-center">
					 <p className="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
					 <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
				 </blockquote>
				</div>

				<div className="benefits-section">
           <Row>
	           <Col className="col-4 text-center justify-content-center">
						    <img src="http://www.fillmurray.com/200/200" className="image-circle mb-3" />
						    <h5>Benefit One</h5>
								<p>More details about the benefit</p>
						 </Col>
						 <Col className="col-4 text-center">
                <img src="http://www.fillmurray.com/201/200" className="image-circle mb-3" />
						    <h5>Benefit Two</h5>
								<p>More details about the benefit</p>
						 </Col>
						 <Col className="col-4 text-center">
                <img src="http://www.fillmurray.com/202/200" className="image-circle mb-3" />
						    <h5>Benefit Three</h5>
								<p>More details about the benefit</p>
						 </Col>
					 </Row>
				</div>

      </div>
    );
  }
}


export default LandingPage;
