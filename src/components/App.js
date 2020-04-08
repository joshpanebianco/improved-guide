import React, {Component} from 'react';
import Nav from './Nav';
import LogIn from './LogIn';
import ForgetPass from './ForgetPass';
import SignUp from './SignUp';
import Home from './Home';
import Survey from './Survey';
import Gallery from './Gallery';
import CreateAd from './CreateAd';
import LandingPage from './LandingPage';
import CreateCompany from './CreateCompany';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios'

import { Container } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      user: {}
    };
  }

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    // Change url after deployment
    axios.get('https://campaign-markt.herokuapp.com/logged_in', {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          this.handleLogin(response)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route render={props => (<Nav {...props} loggedInStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} />)} />
          <Container>
            <Switch>
              <Route exact path="/" render={props => (<LogIn {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />)} />
              <Route path="/signup" render={props => (<SignUp {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />)} />
              <Route path="/forgetpass" component={ ForgetPass } />
              <Route path="/home" render={props => (<Home {...props} loggedInStatus={this.state.isLoggedIn} />)} />
              <Route path="/survey/:galleryId" component={ Survey } />
              <Route path="/gallery" component={ Gallery } />
                <Route path="/ad" component={ CreateAd } />
              <Route path="/landingpage" component={ LandingPage } />
              <Route path="/createcompany" component={ CreateCompany } />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Nav />
//         <Container>
//           <Switch>
//             <Route exact path="/" component={ LogIn } />
//             <Route path="/signup" component={ SignUp } />
//             <Route path="/forgetpass" component={ ForgetPass } />
//             <Route path="/home" component={ Home } />
//             <Route path="/survey" component={ Survey } />
//             <Route path="/campaign" component={ Campaign } />
//             <Route path="/landingpage" component={ LandingPage } />
//           </Switch>
//         </Container>
//       </div>
//     </Router>
//   );
}

export default App;
