import React from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Home from './Home';
import Survey from './Survey';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <LogIn />
      <SignUp />
      <Home />
      <Survey />
    </div>
  );
}

export default App;


// Notes from Alex
// import {Card} from "react-bootstrap"
