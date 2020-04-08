import React, { Component } from 'react';
import axios from 'axios'
import {globalSetting} from './config/global'

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



class SignUp extends Component {
  constructor() {
    super();
    this.state = {
        // signupinfo: [],
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        company_id: '',
        errors: '',
        companies: []
    };

    // why cannot use const getCompanies = function () {} ///// check answer======https://stackoverflow.com/questions/32535110/what-are-the-differences-if-any-between-es6-arrow-functions-and-functions-boun
    const getCompanies = () => {
      axios.get(globalSetting.SERVER_URL + 'requests/companies').then((results) => {
        this.setState({companies: results.data.companies});
        })
    }

    getCompanies()
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {name, email, password, password_confirmation, company_id} = this.state

    let user = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      company_id: company_id
    }

    axios.post('https://campaign-markt.herokuapp.com/users', {user}, {withCredentials: true})
      .then(response => {
        if (response.data.status === 'created') {
          this.props.handleLogin(response.data)
          this.redirect()
        } else {
          this.setState({
            error: response.data.errors
          })
        }
      } )
      .catch(error => console.log('api errors:', error))
  }

  redirect = () => {
    this.props.history.push('/')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  render() {
    return(
      <div>
        <h3>Create A New Account</h3>
        <form onSubmit={ this.handleSubmit }>
         <Form.Group className="w-50">
            <Form.Label>Username</Form.Label>
            <Form.Control name="name" type="text" placeholder="Full name" value={ this.state.name } onChange={ this.handleChange } autoFocus required />
         </Form.Group>

          <Form.Group className="w-50">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="text" placeholder="Email" value={ this.state.email } onChange={ this.handleChange } required />
          </Form.Group>

          <Form.Group className="w-50">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" placeholder="Password" value={ this.state.password } onChange={ this.handleChange } required />
          </Form.Group>

          <Form.Group className="w-50">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control name="password_confirmation" type="password" placeholder="Confirm password" value={ this.state.password_confirmation } onChange={ this.handleChange } required />
          </Form.Group>

          <Form.Group className="w-50">
            <Form.Label>Organization</Form.Label>
            <Form.Control as="select" name="company_id" value={ this.state.company_id } onChange={ this.handleChange }>
              <option value="">--</option>
              {this.state.companies.map((company) => {
                return (<option value={company.id}>{company.name}</option>);
              })};
            </Form.Control>
          </Form.Group>

          <div>
              <input type="submit" value="SIGN UP" className="btn btn-success mb-3"/>
          </div>
        </form>
        <div>
            {
              this.state.errors ? this.handleErrors() : null
            }
        </div>
      </div>
    );
  }
}



export default SignUp;
