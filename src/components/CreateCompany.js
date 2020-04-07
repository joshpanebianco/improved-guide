import React, { Component } from 'react';
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


class CreateCompany extends Component {
  constructor() {
    super();
    this.state = {
        companyinfo: [],
        name: '',
        description: '',
        image: ''
    };
  }

    handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    }

    handleSubmit = (event) => {
      event.preventDefault();
      const {name, description, image} = this.state

      let company = {
        name: name,
        description: description,
        image: image
      }

      axios.post('https://campaign-markt.herokuapp.com/companies', {company}, {withCredentials: true})
      .then(response => {
        console.log(response.data)
      })
    }


  render() {
    return(
      <div>
        <h3>Create A New Company</h3>
        <form onSubmit={ this.handleSubmit }>
         <Form.Group className="w-50">
            <Form.Label>Company Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Company name" value={ this.state.name } onChange={ this.handleChange } autoFocus required />
         </Form.Group>

          <Form.Group className="w-50">
            <Form.Label>Description</Form.Label>
            <Form.Control name="description" type="text" placeholder="Description" value={ this.state.description } onChange={ this.handleChange } required />
          </Form.Group>

          <Form.Group className="w-50">
            <Form.Label>Image</Form.Label>
            <Form.Control name="image" type="text" placeholder="Image" value={ this.state.image } onChange={ this.handleChange } />
          </Form.Group>

          <div>
              <input type="submit" value="Submit" className="btn btn-success mb-3"/>
          </div>
        </form>

      </div>
    );
  }
}

export default CreateCompany;
