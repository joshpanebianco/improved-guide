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
        signupinfo: [],
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        company_id: '',
        errors: ''
    };
    this._saveInfo = this._saveInfo.bind(this);
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

    // Need to update url and redirect function if it works
    axios.post('http://localhost:3001/users', {user}, {withCredentials: true})
      .then(response => {
        if (response.data.status === 'created') {
          this.props.handleLogIn(response.data)
          this.redirect()
        } else {
          this.setState({
            error: response.data.errors
          })
        }
      })
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

  _saveInfo(content) {
    console.log(content);
    const allUserInfo = this.state.signupinfo;
    allUserInfo.push(content);
    this.setState({signupinfo: allUserInfo});
  }


  render() {
    return(
      <div>
        <h3>Create A New Account</h3>
        {/* <SignUpForm onSubmit={ this._saveInfo }/> */}
        <form onSubmit={ this.handleSubmit }>
         <Form.Group className="w-50">
            <Form.Label>First Name (which is full name, will update backend to hold first and last name)</Form.Label>
            <Form.Control name="name" type="text" placeholder="First name" value={ this.state.name } onChange={ this.handleChange } autoFocus required />
         </Form.Group>

         {/* <Form.Group className="w-50">
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="firstname" type="text" placeholder="First name" value={ this.state.firstname } onChange={ this._handleChange } autoFocus required />
         </Form.Group> */}

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
            <Form.Control name="password_confirmation" type="text" placeholder="Confirm password" value={ this.state.password_confirmation } onChange={ this.handleChange } required />
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
