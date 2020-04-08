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
						    <img src="https://images.unsplash.com/photo-1493119508027-2b584f234d6c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" className="image-circle mb-3" />
						    <h5>Measure Your Advertising Results</h5>
								<p>Learn which campaign reached your target customers</p>
						 </Col>
						 <Col className="col-md-4 col-sm-12 text-center">
                <img src="https://images.unsplash.com/photo-1567443026248-f4472c8e5145?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" className="image-circle mb-3" />
						    <h5>Compare Marketing Campaigns</h5>
								<p>Discover which campaigns had the greatest impact</p>
						 </Col>
						 <Col className="col-md-4 col-sm-12 text-center">
                <img src="https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" className="image-circle mb-3" />
						    <h5>Make Data-Driven Decisions</h5>
								<p>Increase return on the money you spend on advertising</p>
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
