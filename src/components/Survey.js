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

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      countSeen: 0,
      countUnSeen: 0,
      allAds: [],
      allHistories: [],
      galleryId: props.match.params.galleryId,
      gallery: {},
    }

    this.saveCount = this.saveCount.bind(this);
    this.updateSeen = this.updateSeen.bind(this);

  }

  fetchGallery = () => {
    const SERVER_URL = 'http://localhost:3000/requests/galleries/'+ this.state.galleryId +'.json';
    this.setState({...this.state, isFetching: true});
    axios.get(SERVER_URL, {withCredentials: false}).then(results => {
      this.setState({gallery: results.data.gallery});
      this.setState({allAds: results.data.ads});
      this.setState({allHistories: results.data.histories})
      this.setState({...this.state, isFetching: false});
    });
  };

  // Fetch gallery on page load
  componentDidMount() {
    this.fetchGallery()
  }

  // Update history 'has_seen' with user input
  updateSeen(index, boolean) {
    const allHistories = this.state.allHistories;
    allHistories[index - 1].has_been_seen = boolean;
    this.setState({allHistories: allHistories});
    console.log(allHistories);

    // index -= 1;
    // const ads = this.state.allAds;
    // ads[index].seen = true;
    // this.setState({allAds: ads });
  }

  saveCount(content) {
    if (content === true) {
      this.setState({countSeen: this.state.countSeen + 1});

    } else {
      this.setState({countUnSeen: this.state.countUnSeen + 1});
    }

  };

  render() {
      const isFetching = this.state.isFetching;
      return (
            <div>
              {isFetching
                ? <p>Loading</p>
                : <div>
                  <Gallery gallery={this.state.gallery} images={ this.state.allAds } increasePoint={ this.saveCount } updateSeen={this.updateSeen} />
                  <Score counter={ this.state.countSeen}/>
                </div>
              }
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
      gallery: this.props.gallery,
    }
    this._onClickSeen = this._onClickSeen.bind(this);
    this._onClickUnSeen = this._onClickUnSeen.bind(this);

    }


  _onClickSeen(event) {
      const index = this.state.index + 1;
      this.setState({index: index, add: this.props.images[index]});
      this.props.updateSeen(index, true);
      this.props.increasePoint(true);
  };

  _onClickUnSeen(event) {
    const index = this.state.index + 1;
    this.setState({index: index, add: this.props.images[index]});
    this.props.updateSeen(index, false);
    this.props.increasePoint(false);
  };



  render(props)
    {
      return this.state.index < this.props.images.length
      ? (
        <div>
          <Row className="d-flex justify-content-center">
            <Card className="shadow">
              <Card.Header as="h5" className="text-white bg-dark">{this.state.gallery.name}</Card.Header>
              <Card.Body>
                <Card.Title>{this.state.gallery.name}</Card.Title>
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
