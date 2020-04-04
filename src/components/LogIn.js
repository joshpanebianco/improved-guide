import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
    userinfo: []
  };
  this._saveInfo = this._saveInfo.bind(this);
}
_saveInfo(content) {
  const allUserInfo = this.state.userinfo;
  allUserInfo.push(content);

}

  render() {
    return (
      <div>
        <h3>Login</h3>
        <LoginForm onSubmit={ this._saveInfo }/>
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
