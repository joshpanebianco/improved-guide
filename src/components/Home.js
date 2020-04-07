import React, { Component } from 'react';
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
  Card
} from "react-bootstrap";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      galleries: [],

    }
  }

  fetchAds = () => {
    const SERVER_URL = 'http://localhost:3001/requests/galleries.json';
    this.setState({...this.state, isFetching: true});
    axios.get(SERVER_URL, {withCredentials: false}).then(results => {
      this.setState({galleries: results.data.galleries});
      this.setState({...this.state, isFetching: false});
    })
  }

  // Fetch ads on page load
  componentDidMount() {
    this.fetchAds()
  }


  render() {
    return (
      <div>
      {this.state.galleries.map ((gallery) => {
        return (<Gallery gallery={gallery} key={gallery.id} />)
      })}

      </div>
    );
  }
}


class Gallery extends Component {

  render() {
    return (

      <Card className="w-75 mb-4">

        <Card.Header as="h5" className="text-white bg-dark">{this.props.gallery.name}</Card.Header>
        <Card.Body>
          <Card.Title>{this.props.gallery.type}</Card.Title>
          <Link to={`/survey/${this.props.gallery.id}`}>
            <Button variant="primary">start</Button>
          </Link>
        </Card.Body>
       </Card>

    );
  }
}


export default Home;
