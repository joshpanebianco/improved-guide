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
          <Card.Title>{this.props.gallery.category}</Card.Title>
          <Link to={`/survey/${this.props.gallery.id}`}>
            <Button variant="primary">Start Survey</Button>
          </Link>
          <Link to={`/stats/${this.props.gallery.id}`}>
            <Button variant="primary">See Responses</Button>
          </Link>
          <Link to={`/gallery/edit/${this.props.gallery.id}`}>Edit</Link>
        </Card.Body>
       </Card>

    );
  }
}


export default UserGalleries;
