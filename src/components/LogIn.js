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

  handleSubmit = (event) => {
    event.preventDefault();
    const {name, email, password} = this.state

    let user = {
      email: email,
      password: password
    }

    // Need to update url and redirect function if it works
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
    this.props.history.push('/home')
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
        {/* <LoginForm onSubmit={ this._saveInfo }/> */}
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
        <Link to="/FogetPass">
        <p>Forgot Password</p>
        </Link>
      </div>
    );
  }
}



class LoginForm extends Component {
  constructor () {
    super();
    this.state = { email: '', password: '' };
    this._handleChangeEmail = this._handleChangeEmail.bind(this);
    this._handleChangePass = this._handleChangePass.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }


_handleChangeEmail(event) {
  this.setState({email: event.target.value});
}
_handleChangePass(event) {
  this.setState({password: event.target.value});
}

_handleSubmit(event) {
  event.preventDefault();
  this.props.onSubmit(this.state);
  this.setState({ email: '', password: '' });
}

  render() {
    return(
      <div>

        <form onSubmit={ this._handleSubmit }>

          <Form.Group controlId="formBasicEmail" className="w-50">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="text" placeholder="Email" value={ this.state.email } onChange={ this._handleChangeEmail } autoFocus required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="w-50">
              <Form.Label>Password</Form.Label>
              <Form.Control name="pass" type="text" placeholder="Password" value={ this.state.password } onChange={ this._handleChangePass } required />
          </Form.Group>

          <input variant="primary" type="submit" value="SIGN IN" className="btn btn-success mb-3" />
        </form>

      </div>
    );
  }
}

export default LogIn;
