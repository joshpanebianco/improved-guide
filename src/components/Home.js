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
  Card
} from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <div>
        <Card className="w-75 mb-4">
          <Card.Header as="h5" className="text-white bg-dark">Company Name</Card.Header>
          <Card.Body>
            <Card.Title>Title of the campaign</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
         </Card>

         <Card className="w-75">
           <Card.Header as="h5" className="text-white bg-dark">Company Name</Card.Header>
           <Card.Body>
             <Card.Title>Title of the campaign</Card.Title>
             <Card.Text>
               With supporting text below as a natural lead-in to additional content.
             </Card.Text>
             <Button variant="primary">Go somewhere</Button>
           </Card.Body>
          </Card>

      </div>
    );
  }
}

export default Home;
