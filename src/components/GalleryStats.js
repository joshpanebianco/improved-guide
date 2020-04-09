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

class GalleryStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      galleryId: props.match.params.galleryId,
      gallery: {},
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
        <CardGroup>
          <Card className="w-75 mb-4">
            <Card.Body>
              <Card.Title>{props.ad.name}</Card.Title>

              <Card.Text>
                <img className="survey-img" src={props.ad.image}/>
              </Card.Text>

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

export default GalleryStats;
