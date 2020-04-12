import React from 'react';
import {Redirect} from 'react-router-dom';

class PermissionCompany extends React.Component {
  render() {
    const companyId = this.props.user.company_id;
    let companyStatus;
    if (companyId === null) {
      companyStatus = false;
    } else {
      companyStatus = true;
    }
    console.log(companyStatus);
    return(
      <div>
        {companyStatus
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

export default PermissionCompany;
