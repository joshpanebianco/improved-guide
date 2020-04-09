import React, {Component} from 'react';
import Nav from './Nav';
import LogIn from './LogIn';
import ForgetPass from './ForgetPass';
import SignUp from './SignUp';
import Home from './Home';
import Survey from './Survey';
import Gallery from './Gallery';
import UserGalleries from './UserGalleries';
import EditGallery from './EditGallery';
import GalleryStats from './GalleryStats';
import CreateAd from './CreateAd';
import EditAd from './EditAd';
import CompanyAds from './CompanyAds';
import LandingPage from './LandingPage';
import Footer from './Footer';
import CreateCompany from './CreateCompany';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios'
import Permission from './Permission';

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
          <Route render={props => (<Nav {...props} loggedInStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} user={this.state.user}/>)} />
          <Container className="main-container">
            <Switch>
              <Route path="/landingpage" component={ LandingPage } />
              <Route exact path="/login" render={props => (<LogIn {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />)} />
              <Route path="/signup" render={props => (<SignUp {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />)} />

              <Route path="/forgetpass" component={ ForgetPass } />

              <Permission {...this.props} loggedInStatus={this.state.isLoggedIn}>
                <Route path="/explore" render={props => (<Home {...props} loggedInStatus={this.state.isLoggedIn} user={this.state.user}/>)} />
                <Route path="/survey/:galleryId" render={props => (<Survey {...props} loggedInStatus={this.state.isLoggedIn} user={this.state.user}/>)} />
                <Route path="/gallery/new" render={props => (< Gallery {...props} user={ this.state.user} />)} />
                <Route path= "/gallery/:userId" render={props => (<UserGalleries {...props} user={this.state.user} />)} />
                <Route path="/stats/:galleryId" component={ GalleryStats } />
                <Route path="/ads/new" render={props => (<CreateAd {...props} loggedInStatus={this.state.isLoggedIn} user={this.state.user}/>)} />
                <Route path="/ads/edit/:adId" render={props => (<EditAd {...props} loggedInStatus={this.state.isLoggedIn} user={this.state.user}/>)} />
                <Route path="/ads/:companyId" render={props => (<CompanyAds {...props} loggedInStatus={this.state.isLoggedIn} user={this.state.user}/>)} />

                <Route path="/createcompany" component={ CreateCompany } />
              </Permission>
            </Switch>
          </Container>
          <Footer />
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
