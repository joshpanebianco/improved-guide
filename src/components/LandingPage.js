import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
	Col
} from "react-bootstrap";


class LandingPage extends Component {
  render() {
    return (
      <div>
				<div className="hero-image">

        </div>

				<div className="quote-section my-5">
					<blockquote className="blockquote text-center">
					 <p className="mb-0">“Unless your advertising has a big idea, it will pass like a ship in the night”</p>
					 <footer className="blockquote-footer">David Ogilvy<cite title="Source Title"></cite></footer>
				 </blockquote>
				</div>

				<div className="benefits-section">
           <Row>
	           <Col className="col-md-4 col-sm-12 text-center justify-content-center">
						    <img src="http://www.fillmurray.com/200/200" className="image-circle mb-3" />
						    <h5>Benefit One</h5>
								<p>More details about the benefit</p>
						 </Col>
						 <Col className="col-md-4 col-sm-12 text-center">
                <img src="http://www.fillmurray.com/201/200" className="image-circle mb-3" />
						    <h5>Benefit Two</h5>
								<p>More details about the benefit</p>
						 </Col>
						 <Col className="col-md-4 col-sm-12 text-center">
                <img src="http://www.fillmurray.com/202/200" className="image-circle mb-3" />
						    <h5>Benefit Three</h5>
								<p>More details about the benefit</p>
						 </Col>
					 </Row>
				</div>

        <div className="homepage-cta my-5 pt-5 pb-5">
          <h4>Gain Deeper Insights Into Your Advertising Campaigns</h4>
          <Link to="/signup">
            <Button variant="success" size="lg" className="mt-5 w-25">Get Started</Button>
          </Link>
        </div>

      </div>
    );
  }
}


export default LandingPage;
