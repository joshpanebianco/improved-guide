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
  NavItem
} from "react-bootstrap";


class CreateAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFetching: false,
        adInfo: [],
        name: '',
        ad_type: 'Social Media',
        image: '',
        user_id: props.user.id,
        company_id: props.user.company_id,
        company: {},
    };
  }

  fetchCompany = () => {
    this.setState({isFetching: true});
    // const SERVER_URL = 'http://localhost:3001/requests/companies/'+this.state.company_id+'.json';
    const SERVER_URL = 'https://campaign-markt.herokuapp.com/requests/companies/'+this.state.company_id+'.json';
    axios.get(SERVER_URL, {withCredentials: true}).then((results) => {
      this.setState({company: results.data.company});
      this.setState({isFetching: false});
    });
  }

  componentDidMount() {
    this.fetchCompany();
  }

  postAd = (ad) => {
    // const SERVER_URL = 'http://localhost:3001/ads';
    const SERVER_URL = 'https://campaign-markt.herokuapp.com/ads';
    axios.post(SERVER_URL, {ad}, {withCredentials: true}).then((results) => {
      console.log("SUBMITTED");
      this.redirect();
    });
  }

  redirect = () => {
    this.props.history.push(`/ads/company-ads/${this.state.company_id}`)
  }

    handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const {name, ad_type, company_id, user_id, image} = this.state

      let ad = {
        name: name,
        ad_type: ad_type,
        company_id: company_id,
        user_id: user_id,
        image: image,
      }
      this.postAd(ad);
    }



  render() {
    const isFetching = this.state.isFetching;
    return(
      <div>
        {isFetching
        ? <p>Loading Create Ad</p>
        : <div>
          <h3>Create A New Ad</h3>
          <form onSubmit={ this.handleSubmit }>
           <Form.Group className="w-50">
              <Form.Label>Ad Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Ad name" value={ this.state.name } onChange={ this.handleChange } autoFocus required />
           </Form.Group>

            <Form.Group className="w-50">
              <Form.Label>Ad Type</Form.Label>
              <Form.Control as="select" name="ad_type" onChange={this.handleChange}>
                <option>Social Media</option>
                <option>TV</option>
                <option>Billboard</option>
                <option>Newspaper/Magazine</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="w-50">
              <Form.Label>Company</Form.Label>
              <Form.Control name="company" type="text" plaintext readOnly defaultValue={this.state.company.name}></Form.Control>
            </Form.Group>

            <Form.Group className="w-50">
              <Form.Label>Image</Form.Label>
              <Form.Control name="image" type="text" placeholder="URL" value={ this.state.image } onChange={ this.handleChange } />
            </Form.Group>

            <div>
                <input type="submit" value="Submit" className="btn btn-success mb-3"/>
            </div>
          </form>

        </div>
      }
      </div>

    );
  }
}

export default CreateAd;
