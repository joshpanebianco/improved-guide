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
      user_id: props.user.id,
      company_id: props.user.company_id,
      companyLogo: {}
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

  fetchCompanyLogo = () => {
    const SERVER_URL = 'https://campaign-markt.herokuapp.com/requests/companies/'+ this.state.company_id + ".json";
    // const SERVER_URL = 'http://localhost:3001/requests/companies/'+ this.state.company_id;
    this.setState({...this.state, isFetching: true});
    axios.get(SERVER_URL, {withCredentials: true}).then(results => {
      this.setState({companyLogo: results.data.company.image});
      console.log(this.state.companyLogo);
      this.setState({...this.state, isFetching: false});
    })
  }

  // Fetch ads on page load
  componentDidMount() {
    this.fetchGalleries();
    this.fetchCompanyLogo();
  }




  render() {
    const isFetching = this.state.isFetching;
    return (
      <div>
        <h1>My Galleries</h1>
        {isFetching
          ? <p>Loading Gallery</p>
          : <div>
            {this.state.galleries.map ((gallery) => {

                    return (<Gallery key={gallery.id} gallery={gallery} companyImage={this.state.companyLogo}/>)
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
      <Card className="w-25 mb-4" >

        <Card.Header as="h5" className="text-white bg-dark">{this.props.gallery.name}</Card.Header>
        <Card.Body className='d-flex align-items-center shadow explore-card'>
          <div className={'in-card card-left'}>

              <Card.Text>
                <img
                  className='img-logo'
                  src={this.props.companyImage}
                  alt='Company logo'
                />
              </Card.Text>


            <Card.Title>{this.props.gallery.category}</Card.Title>
          </div>
          <div className={'in-card card-right'}>
          <Link to={`/survey/${this.props.gallery.id}`}>
             <Button className="mr-3" variant="success">Start Survey</Button>
           </Link>
           <Link to={`/stats/${this.props.gallery.id}`}>
             <Button variant="info">See Responses</Button>
           </Link>
            <Link to={`/gallery/edit/${this.props.gallery.id}`}>Edit</Link>

          </div>

        </Card.Body>
       </Card>
    );
  }
}


export default UserGalleries;
