import React, { Component } from 'react';
import axios from 'axios';
import {globalSetting} from './config/global.js';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  NavItem,
  Col
} from "react-bootstrap";


class CreateCompany extends Component {
  constructor() {
    super();
    this.state = {
        companies: [],
        name: '',
        description: '',
        image: '',
        editing: false,
        companyId: ''
    };
  }

  fetchCompanies = () => {
    console.log('fetching')
    axios.get(globalSetting.SERVER_URL + 'companies' + '.json')
    .then(response => {
      const companies = response.data.companies;
      this.setState({companies: companies})
    })
  }

  resetForm = () => {
    this.setState({
      name: '',
      description: '',
      image: ''
    })
  }

  componentDidMount() {
    this.fetchCompanies()
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

    axios.post(globalSetting.SERVER_URL + 'companies', {company}, {withCredentials: true})
    .then(response => {
      this.fetchCompanies();
      this.resetForm();
    })
  }

  handleDelete = (companyId) => {
    console.log(companyId.toString())
    axios.delete(globalSetting.SERVER_URL + 'companies/' + companyId + '.json', {withCredentials: true})
    .then(response => {
      this.fetchCompanies();
      this.resetForm();
      this.setState({editing: false})
    })
  }

  editMode = (company) => {
    this.setState({
      name: company.name,
      description: company.description,
      image: company.image,
      editing: true,
      companyId: company.id
    })
  }

  handleUpdate = (event) => {
    event.preventDefault();
    const {name, description, image} = this.state
    const company = {
      name: name,
      description: description,
      image: image
    }
    axios.patch(globalSetting.SERVER_URL + 'companies/' + this.state.companyId + '.json',
     {company},
     {withCredentials:true})
    .then(response => {
      this.fetchCompanies();
      this.setState({editing: false})
      this.resetForm()
    })
  }

  render() {
    return(
      <div className="edit-company">
        <Col lg={6} className="company-form">
          {this.state.editing?
          <h3>Edit Your Company</h3>
          :
          <h3>Create A New Company</h3>
          }
          <form onSubmit={ this.state.editing? this.handleUpdate : this.handleSubmit }>
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

            {this.state.editing?
              <input type="submit" value="Update" className="btn btn-success mb-3"/>

            :
              <input type="submit" value="Submit" className="btn btn-success mb-3"/>
            }
          </form>
        </Col>
        
        {this.state.companies.length?
          <Col lg={6} className="company-list">
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Description</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.companies.map((company) =>
                  <tr key={company.id}>
                    <td>{company.name}</td>
                    <td>{company.description}</td>
                    <td>
                    <input 
                        type="submit" 
                        value="Edit"
                        className="btn btn-success"
                        onClick={() => this.editMode(company)}
                      />
                    </td>
                    <td>
                      <input 
                        type="submit" 
                        value="Delete"
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(company.id)}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Col>
          : <div></div>
        }
      </div>
    );
  }
}

export default CreateCompany;
