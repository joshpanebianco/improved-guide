import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataBar from './DataBar';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  NavItem,
  CardGroup,
  Card,
  Row
} from "react-bootstrap";

class CompanyAds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      companyId: props.user.company_id,
      company: {},
      allAds: [],
      historyInfo: [],
    }
  }

  fetchData = () => {
    this.setState({isFetching: true});
    const SERVER_URL = 'https://campaign-markt.herokuapp.com/requests/ads/'+this.state.companyId+'.json';
    // const SERVER_URL = 'http://localhost:3001/requests/ads/'+this.state.companyId+'.json';
    axios.get(SERVER_URL, {withCredentials: true}).then((results) => {
      this.setState({
        company: results.data.company,
        allAds: results.data.ads,
        historyInfo: results.data.history_info,
      });
      console.log(results.data);
      this.setState({isFetching: false});
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const isFetching = this.state.isFetching;
    return (
      <div>
        <h1>{this.state.company.name} Ads</h1>
        {isFetching
          ? <p>Loading Ads</p>
          : (
            <div>
              {
                this.state.allAds.map((ad, index) => {
                  const history = this.state.historyInfo[index];
                  return(
                    <div>
                      <AdResult key={ad.id} ad={ad} history={history} />
                    </div>
                  )
                })
              }
              <Link to="/explore">Check out other galleries</Link>
            </div>
          )
        }
      </div>
    )
  }
};

const AdResult = (props) => {
  return (
    <div>
     <Row className="d-flex justify-content-center">
       <CardGroup>
         <Card className="w-75 mb-4">
           <Card.Body>
             <Card.Title>{props.ad.name}</Card.Title>

             <Card.Text>
               <img className="survey-img" src={props.ad.image}/>
             </Card.Text>
            <Link to={`/ads/edit/${props.ad.id}`}>Edit</Link>
           </Card.Body>
          </Card>
          <Card className="w-75 mb-4 text-center justify-content-center">
            <Card.Body className="justify-content-center">
              <Card.Title>Ad Stats</Card.Title>
              <Card.Text>Have Seen / Have Not Seen</Card.Text>
              <DataBar history={props.history}/>
              <small>Total Responses: {props.history.total}</small>
            </Card.Body>
           </Card>
       </CardGroup>
    </Row>
    </div>
  )
}

export default CompanyAds;
