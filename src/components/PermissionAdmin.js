import React from 'react';
import {Redirect} from 'react-router-dom';

class PermissionAdmin extends React.Component {
  render() {
    const adminStatus = this.props.user.admin;
    return(
      <div>
        {adminStatus
          ? <div>
            {this.props.children}
          </div>
          : <div>
            <Redirect to="/explore" />
          </div>
        }
      </div>
    )
  }
}

export default PermissionAdmin;
