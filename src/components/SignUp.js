import React, { Component } from 'react';



class SignUp extends Component {
  constructor() {
    super();
    this.state = {
        signupinfo: []
    };
    this._saveInfo = this._saveInfo.bind(this);
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
          <div>
            <input name="firstname" type="text" placeholder="First name" value={ this.state.firstname } onChange={ this._handleChange } autoFocus required />
          </div>
          <div>
            <input name="lastname" type="text" placeholder="Last name" value={ this.state.lastname } onChange={ this._handleChange } required />
          </div>
          <div>
            <input name="email" type="text" placeholder="Email" value={ this.state.email } onChange={ this._handleChange } required />
          </div>
          <div>
            <input name="password" type="text" placeholder="Password" value={ this.state.password } onChange={ this._handleChange } required />
          </div>
          <div>
            <input name="confirmpass" type="text" placeholder="Confirm password" value={ this.state.confirmpass } onChange={ this._handleChange } required />
          </div>
          <div>
            <input name="organization" type="text" placeholder="Organization" value={ this.state.organization } onChange={ this._handleChange } />
          </div>
          <div>
              <input type="submit" value="SIGN UP" />
          </div>
        </form>
      </div>
    );
  }
};

export default SignUp;
