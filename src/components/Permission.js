import React from 'react';
import {Redirect} from 'react-router-dom';

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
              <Redirect to="/login" />
          </div>
        }
      </div>
    )
  }
}

export default Permission;
