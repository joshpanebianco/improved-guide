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
  Card,
  Row,
  Col
} from "react-bootstrap";

class UserGalleries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      galleries: [],
      user_id: props.user.id
    }
  }

  fetchGalleries = () => {
    const SERVER_URL = 'https://campaign-markt.herokuapp.com/requests/galleries/user/'+ this.state.user_id + ".json";
    // const SERVER_URL = 'http://localhost:3001/requests/galleries/user/'+ this.state.user_id;
    this.setState({...this.state, isFetching: true});
    axios.get(SERVER_URL, {withCredentials: true}).then(results => {
      this.setState({
        galleries: results.data.galleries,

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
        <h1>My Galleries</h1>
        {isFetching
          ? <p>Loading Galleries</p>
          : <div>
            {this.state.galleries.map ((gallery) => {

                    return (<Gallery key={gallery.id} gallery={gallery} />)
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

      <Card className="w-75 mb-4">

        <Card.Header as="h5" className="text-white bg-dark">{this.props.gallery.name}</Card.Header>
        <Card.Body>
          <Container>
            <div className="row justify-content-start">
              <Card.Title>{this.props.gallery.category}</Card.Title>
            </div>
            <div className="row">
              <div className="col-md-3">
                <Link to={`/survey/${this.props.gallery.id}`}>
                  <Button variant="primary">Start Survey</Button>
                </Link>
              </div>
              <div className="col-md-3">
                <Link to={`/stats/${this.props.gallery.id}`}>
                  <Button variant="primary">See Responses</Button>
                </Link>
              </div>
              <div className="col-md-2 offset-md-4">
                <Link to={`/gallery/edit/${this.props.gallery.id}`}>Edit</Link>
              </div>
            </div>
          </Container>
        </Card.Body>
       </Card>

    );
  }
}


export default UserGalleries;
