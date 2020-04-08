import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  NavItem,
  Card,
  Row
} from "react-bootstrap";

class MyAds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      userId: props.user.id,
      allAds: [],
      historyInfo: [],
    }
  }

  fetchData = () => {
    this.setState({isFetching: true});
    const SERVER_URL = 'https://campaign-markt.herokuapp.com/requests/histories/'+this.state.galleryId+'.json';
    axios.get(SERVER_URL, {withCredentials: true}).then((results) => {
      this.setState({
        gallery: results.data.gallery,
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
        <h1>Statistics</h1>
        {isFetching
          ? <p>Loading Statistics</p>
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
      <Card className="w-75 mb-4">
        <Card.Body>
          <Card.Title>{props.ad.name}</Card.Title>

          <Card.Text>
            <img className="survey-img" src={props.ad.image}/>
          </Card.Text>

          <Card.Text>Population Stats</Card.Text>
          <Card.Text>Seen: {props.history.has_seen_total}</Card.Text>
          <Card.Text>Not Seen: {props.history.has_notseen_total}</Card.Text>
          <Card.Text>Total: {props.history.total}</Card.Text>
        </Card.Body>
       </Card>
     </Row>
    </div>
  )
}

export default MyAds;
