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
        <h1>Explore Galleries</h1>
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

      <Card className='w-25 mb-4'>
				<Card.Header as='h5' className='text-white bg-dark'>
					{this.props.gallery.name}
				</Card.Header>
				<Card.Body className='d-flex align-items-center shadow explore-card'>
					<div className={'in-card card-left'}>
						{this.props.company && (
							<Card.Text>
								<img
									className='img-logo'
									src={this.props.company.image}
									alt='Company logo'
								/>
							</Card.Text>
						)}
						<Card.Title>{this.props.gallery.category}</Card.Title>
					</div>
					<div className={'in-card card-right'}>
						<Button
							href={`#/survey/${this.props.gallery.id}`}
							variant='success'
						>
							Start Survey
						</Button>
						<Button href={`#/stats/${this.props.gallery.id}`} variant='info'>
							See Survey
						</Button>
					</div>
				</Card.Body>
			</Card>

    );
  }
}


export default Home;
