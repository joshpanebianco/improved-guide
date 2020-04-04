import React from 'react';
import Nav from './Nav';
import LogIn from './LogIn';
import ForgetPass from './ForgetPass';
import SignUp from './SignUp';
import Home from './Home';
import Survey from './Survey';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
<<<<<<< HEAD
    <div className="App">
          <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand href="#home">Project Two</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
              </Nav>

                <Button href="login"className="mr-3" variant="dark">login</Button>
                <Button variant="success">SignUp</Button>

            </Navbar.Collapse>
            </Container>
      </Navbar>
      <Container>
        <LogIn />
        <SignUp />
        <Home />
        <Survey />
      </Container>

    </div>
=======
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
>>>>>>> ef3a9868281155eb518b9526eb64bf980cf2d0e1
  );
}

export default App;
