import React, { Component } from 'react';

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
        signupinfo: []
    };
    this._saveInfo = this._saveInfo.bind(this);
  }

_saveInfo(content) {
  const newUserInfo = {signupinfo: content};
  const allUserInfo = this.state.signupinfo;
  allUserInfo.push(newUserInfo);
  this.setState({signupinfo: allUserInfo});
}


  render() {
    return(
      <div>
        <h3>Create A New Account</h3>
        <SignUpForm onSubmit={ this._saveInfo }/>
      </div>
    );
  }
}



class SignUpForm extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmpass: '',
      organization: ''
    };
      this._handleChange = this._handleChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
  };

_handleChange( event ) {
  this.setState({[event.target.name]: event.target.value})
}



_handleSubmit(event) {
  event.preventDefault();
  this.props.onSubmit(this.state);
  this.setState({firstname: '', lastname: '', email: '', password: '', confirmpass: '', organization: '' });
}

  render() {
    return (
      <div>
        <form onSubmit={ this._handleSubmit }>
         <Form.Group className="w-50">
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstname" type="text" placeholder="First name" value={ this.state.firstname } onChange={ this._handleChange } autoFocus required />
         </Form.Group>

         <Form.Group className="w-50">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastname" type="text" placeholder="Last name" value={ this.state.lastname } onChange={ this._handleChange } autoFocus required />
         </Form.Group>

          <Form.Group className="w-50">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="text" placeholder="Email" value={ this.state.email } onChange={ this._handleChange } required />
          </Form.Group>

          <Form.Group className="w-50">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="text" placeholder="Password" value={ this.state.password } onChange={ this._handleChange } required />
          </Form.Group>

          <Form.Group className="w-50">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control name="confirmpass" type="text" placeholder="Confirm password" value={ this.state.confirmpass } onChange={ this._handleChange } required />
          </Form.Group>

          <Form.Group className="w-50">
            <Form.Label>Organization</Form.Label>
            <Form.Control name="organization" type="text" placeholder="Organization" value={ this.state.organization } onChange={ this._handleChange } required />
          </Form.Group>

          <div>
              <input type="submit" value="SIGN UP" className="btn btn-success mb-3"/>
          </div>
        </form>
      </div>
    );
  }
};

export default SignUp;
