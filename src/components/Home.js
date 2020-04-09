import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Permission from './Permission';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  NavItem,
  Card,
  Row,
  Col
} from "react-bootstrap";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      galleries: [],
      companies: [],
    }
  }

  fetchGalleries = () => {
    const SERVER_URL = 'https://campaign-markt.herokuapp.com/requests/galleries';
    // const SERVER_URL = 'http://localhost:3001/requests/galleries.json';
    this.setState({...this.state, isFetching: true});
    axios.get(SERVER_URL, {withCredentials: true}).then(results => {
      this.setState({
        galleries: results.data.galleries,
        companies: results.data.companies,
      });
      this.setState({...this.state, isFetching: false});
    })
  }

  // Fetch ads on page load
  componentDidMount() {
    this.fetchGalleries()
  }


  render() {
    const isFetching = this.state.isFetching;
    return (
      <div>
        {isFetching
          ? <p>Loading Galleries</p>
          : <div>
            {this.state.galleries.map ((gallery, index) => {
                    const company = this.state.companies[index]
                    return (<Gallery key={gallery.id} gallery={gallery} company={company} />)
                  })}
          </div>
        }
      </div>
    );
  }
}


class Gallery extends Component {

  render() {
    return (

      <Card className="w-50 mb-4">

        <Card.Header as="h5" className="text-white bg-dark">{this.props.gallery.name}</Card.Header>
        <Card.Body className="d-flex align-items-center shadow">
        <Container>
          <Row>
             <Col>
             <div className="d-flex justify-content-start align-items-center">
              {this.props.company !== null
                ?   <Card.Text>
                      <img className="img-logo" src={this.props.company.image} alt="Company logo" />
                    </Card.Text>
                : null
                }
                <Card.Title>{this.props.gallery.category}</Card.Title>
               </div>
              </Col>
            </Row>
          <Row>
            <Col>
              <div className="d-flex justify-content-start">
                <Link to={`/survey/${this.props.gallery.id}`}>
                  <Button className="mr-3" variant="success">Start Survey</Button>
                </Link>
                <Link to={`/stats/${this.props.gallery.id}`}>
                  <Button variant="info">See Responses</Button>
                </Link>
              </div>
            </Col>
          </Row>
         </Container>
        </Card.Body>
       </Card>

    );
  }
}


export default Home;
