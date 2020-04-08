import React from 'react';
import {Link} from 'react-router-dom';

class Permission extends React.Component {
  render() {
    const loggedInStatus = this.props.loggedInStatus;
    return(
      <div>
        {loggedInStatus
          ? <div>
            {this.props.children}
          </div>
          : <div>
            <p>You must be logged in to view this.</p>
            <Link to="/login">Log In Here</Link>
            <br />
            <Link to="/signup">Sign Up Here</Link>
          </div>
        }
      </div>
    )
  }
}

export default Permission;
