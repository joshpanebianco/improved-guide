import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GALLERY_URL = 'https://localhost:3000/requests/galleries/2.json'

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

class Survey extends Component {
  constructor() {
    super();
    this.state = {
      countSeen: 0,
      countUnSeen: 0,
      allAds: [
        {id: 1, image: 'https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/1/9/0/3/2903091-5-eng-GB/Extending-equity-and-iconic-appeal-Coca-Cola-unites-brands-with-global-campaign_wrbm_medium.jpg', seen: false},
        {id: 2, image: 'https://s3-ap-southeast-1.amazonaws.com/images.marketing-interactive.com/wp-content/uploads/2017/06/no-sugar-e1497234889946.jpg', seen: false},
        {id: 3, image: 'https://www.communicus.com/wp-content/uploads/2017/03/coca-cola-ad-drink.jpg', seen: false}
      ],
      gallery: {},
    }

    this.saveCount = this.saveCount.bind(this);
    this.updateSeen = this.updateSeen.bind(this);


    // const request = require('request');
    // request('https://localhost:3000/requests/galleries/2.json', function (error, response, body) {
    //   console.error('error:', error); // Print the error if one occurred
    //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //   console.log('body:', body); // Print the HTML for the Google homepage.
    // });
    //
    // // At request level
    // const https = require('https');
    // const agent = new https.Agent({
    //   rejectUnauthorized: false
    // });
    //
    // axios.get('https://localhost:3000/requests/galleries/2.json', { httpsAgent: agent })

    // const galleryList = axios.create({
    //   withCredentials: true,
    //   headers: {
    //     'Accept': 'application/json',
    //   }
    // });

    const fetchGallery = () => {
      axios.get('http://localhost:3000/requests/galleries/2.json', {withCredentials: false}).then(results => {
        this.setState({gallery: results.data.gallery});
        console.log(results.data.gallery);
      });
    };

    fetchGallery();
  }

updateSeen(index) {
  index -= 1;
  const ads = this.state.allAds;
  ads[index].seen = true;
  this.setState({allAds: ads });
}


saveCount(content) {
  if (content === true) {
    this.setState({countSeen: this.state.countSeen + 1});

  } else {
    this.setState({countUnSeen: this.state.countUnSeen + 1});
  }

};

  render() {
    return (
      <div>
        <Gallery images={ this.state.allAds } increasePoint={ this.saveCount } updateSeen={this.updateSeen} />
        <Score counter={ this.state.countSeen}/>
      </div>
    );
  }
};



class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      add: this.props.images[0],

    }
    this._onClickSeen = this._onClickSeen.bind(this);
    this._onClickUnSeen = this._onClickUnSeen.bind(this);

    }


  _onClickSeen(event) {
      const index = this.state.index + 1;
      this.setState({index: index, add: this.props.images[index]});
      this.props.updateSeen(index);
      this.props.increasePoint(true);
  };

  _onClickUnSeen(event) {
    // this.setState({seen: false});
    const index = this.state.index + 1;
    this.setState({index: index, add: this.props.images[index]});
    this.props.increasePoint(false);
  };



  render(props)
    {
      return this.state.index < this.props.images.length
      ? (
        <div>
          <Row className="d-flex justify-content-center">
            <Card className="shadow">
              <Card.Header as="h5" className="text-white bg-dark">Company Name</Card.Header>
              <Card.Body>
                <Card.Title>Campaign Title</Card.Title>
                <Card.Text>
                  <img className="survey-img" src={this.state.add.image}/>
                </Card.Text>
                <div className="survey-btn">
                  <Button variant="warning" size="lg" className="survey-cta" onClick={ this._onClickUnSeen }>Not Seen</Button>
                  <Button variant="success" size="lg" className="survey-cta" onClick={ this._onClickSeen } >Seen</Button>
                </div>
              </Card.Body>
              </Card>
          </Row>
        </div>
      )
      : <img src='https://i.pinimg.com/474x/8e/44/6b/8e446b0c8ff905d51d96b8a9e01f296c.jpg'/>
    }

};

const Score = (props) => {
  return(
    <div>
    <div>

    </div>
      <Row className="d-flex justify-content-center">
        <Card body className="score-card my-4 text-center shadow"><h5 className="my-4">Your Score: {props.counter}</h5></Card>
      </Row>
    </div>
  );
}



export default Survey;
