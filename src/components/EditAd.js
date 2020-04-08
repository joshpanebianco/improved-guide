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


class EditAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFetching: false,
        adId: props.match.params.adId,
        adInfo: [],
        name: '',
        ad_type: '',
        image: '',
        user_id: props.user.id,
        company_id: props.user.company_id,
        company: {},
    };
  }

  fetchAd = () => {
    this.setState({isFetching: true});
    // const SERVER_URL = 'http://localhost:3001/ads/'+this.state.adId+'/edit.json';
    const SERVER_URL = 'https://campaign-markt.herokuapp.com/ads/'+this.state.adId+'/edit.json';
    axios.get(SERVER_URL, {withCredentials: true}).then((results) => {
      this.setState({
        adInfo: results.data.ad,
        name: results.data.ad.name,
        ad_type: results.data.ad.ad_type,
        image: results.data.ad.image,
        company: results.data.company,
      });
      this.setState({isFetching: false});
    });
  }

  componentDidMount() {
    this.fetchAd();
  }

  patchAd = (ad) => {
    // const SERVER_URL = 'http://localhost:3001/ads/'+this.state.adId+'.json';
    const SERVER_URL = 'https://campaign-markt.herokuapp.com/ads/'+this.state.adId+'.json';
    axios.patch(SERVER_URL, {ad}, {withCredentials: true}).then((results) => {
      console.log("SUBMITTED");
      this.redirect();
    });
  }

  redirect = () => {
    this.props.history.push(`/ads/${this.state.company_id}`);
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
      this.patchAd(ad);
    }



  render() {
    const isFetching = this.state.isFetching;
    return(
      <div>
        {isFetching
        ? <p>Loading Edit Ad</p>
        : <div>
          <h3>Edit Ad</h3>
          <form onSubmit={ this.handleSubmit }>
           <Form.Group className="w-50">
              <Form.Label>Ad Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Ad name" value={ this.state.name } onChange={ this.handleChange } autoFocus required />
           </Form.Group>

            <Form.Group className="w-50">
              <Form.Label>Ad Type</Form.Label>
              <Form.Control as="select" name="ad_type" value={ this.state.ad_type } onChange={this.handleChange}>
                <option>Social Media</option>
                <option>TV</option>
                <option>Billboard</option>
                <option>Newspaper/Magazine</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="w-50">
              <Form.Label>Company</Form.Label>
              <Form.Control plaintext readOnly defaultValue={this.state.company.name}></Form.Control>
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

export default EditAd;
