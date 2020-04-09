import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './config/global'

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

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      userinfo: [],
      name: '',
      email: '',
      password: '',
      errors: ''
    };
    this._saveInfo = this._saveInfo.bind(this);
  }

  componentWillMount() {
    return this.props.loggedInStatus ? this.redirect() : null
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  // Log in function
  handleSubmit = (event) => {
    event.preventDefault();
    const {name, email, password} = this.state

    let user = {
      email: email,
      password: password
    }

    axios.post('https://campaign-markt.herokuapp.com/login', {user}, {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleLogin(response.data)
          this.redirect()
        } else {
          this.setState({
            error: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error))
  };

  redirect = () => {
    this.props.history.push('/explore')
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
    );
  }

  _saveInfo(content) {
    const allUserInfo = this.state.userinfo;
    allUserInfo.push(content);
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={ this.handleSubmit }>

          <Form.Group controlId="formBasicEmail" className="w-50">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="text" placeholder="Email" value={ this.state.email } onChange={ this.handleChange } autoFocus required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="w-50">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" value={ this.state.password } onChange={ this.handleChange } required />
          </Form.Group>

          <input variant="primary" type="submit" value="SIGN IN" className="btn btn-success mb-3" />

          </form>
          <div>
            {
              this.state.errors ? this.handleErrors() : null
            }
          </div>
        <Link to="/signup">
        <p>Not already signed up?</p>
        </Link>
      </div>
    );
  }
}

export default LogIn;
