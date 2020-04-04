import React from 'react';
import Nav from './Nav';
import LogIn from './LogIn';
import ForgetPass from './ForgetPass';
import SignUp from './SignUp';
import Home from './Home';
import Survey from './Survey';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';



function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={ LogIn } />
          <Route path="/signup" component={ SignUp } />
          <Route path="/forgetpass" component={ ForgetPass } />
          <Route path="/home" component={ Home } />
          <Route path="/survey" component={ Survey } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


// Notes from Alex
// import {Card} from "react-bootstrap"
