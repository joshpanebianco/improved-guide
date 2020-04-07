import React, { Component } from 'react';
import axios from 'axios'

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
        errors: ''
    };

    const getCompanies = function () {
      axios.post
    }
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
            <Form.Label>Full name (which is full name, will update backend to hold first and last name)</Form.Label>
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
            <Form.Label>Organization (Optional)</Form.Label>
            <Form.Control name="company_id" type="text" placeholder="Organization" value={ this.state.company_id } onChange={ this.handleChange } />
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
