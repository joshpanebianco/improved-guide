import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        <h2>LOG IN</h2>
        <LoginForm onSubmit={ this._saveInfo }/>
        <Link to="/FogetPass">
        <p>forgot password</p>
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
          <div>
            <input name="email" type="text" placeholder="Email" value={ this.state.email } onChange={ this._handleChangeEmail } autoFocus required />
          </div>
          <div>
            <input name="pass" type="text" placeholder="Password" value={ this.state.password } onChange={ this._handleChangePass } required />
          </div>
          <div>

              <input type="submit" value="SIGN IN" />

          </div>
        </form>
      </div>
    );
  }
}

export default LogIn;
