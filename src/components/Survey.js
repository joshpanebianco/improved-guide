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
      imagesRemaining: true,
      count: 0,
      countSeen: 0,
      countUnSeen: 0,
      allAds: [],
      allHistories: [],
      galleryId: props.match.params.galleryId,
      gallery: {},
      historyInfo: [],
    }

    this.saveCount = this.saveCount.bind(this);
    this.updateSeen = this.updateSeen.bind(this);
    this.updateCount = this.updateCount.bind(this);
    this.fetchHistory = this.fetchHistory.bind(this);
    this.updateDatabase = this.updateDatabase.bind(this);

  }

  fetchHistory = () => {
    const SERVER_URL = 'https://campaign-markt.herokuapp.com/requests/histories/'+ this.state.galleryId +'.json';
    this.setState({...this.state, isFetching: true});
    axios.get(SERVER_URL, {withCredentials: true}).then(results => {
      this.setState({historyInfo: results.data.history_info});
      this.setState({...this.state, isFetching: false});
      this.setState({...this.state, imagesRemaining: false});
      console.log(results.data.history_info);
    });
  }

  fetchGallery = () => {
    const SERVER_URL = 'https://campaign-markt.herokuapp.com/requests/galleries/'+ this.state.galleryId +'.json';
    this.setState({...this.state, isFetching: true});
    axios.get(SERVER_URL, {withCredentials: true, headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(results => {
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

  updateDatabase = async (allHistories) => {
    this.setState({...this.state, isFetching: true});
    await allHistories.forEach((history, index) => {
      axios.post('https://campaign-markt.herokuapp.com/requests/histories/'+history.id+'.json', {id: history.id, user_id: history.user_id, ad_id: history.ad_id, has_been_seen: history.has_been_seen}, {withCredentials: true}).then((results) => {
        console.log("SUBMITTED");
      });
    });

  }

  // Update history 'has_seen' with user input
  updateSeen(index, boolean) {
    const allHistories = this.state.allHistories;
    allHistories[index - 1].has_been_seen = boolean;
    this.setState({allHistories: allHistories});
  }

  updateCount(index) {
    let count = this.state.count + 1;
    this.setState({count: count});
    if (count === this.state.allAds.length) {
      this.setState({imagesRemaining: false});
      this.updateDatabase(this.state.allHistories);
      this.fetchHistory();
    }
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
      const imagesRemaining = this.state.imagesRemaining;
      return (
            <div>
              {isFetching
                ? <p>Loading</p>
                : <div>
                  {imagesRemaining
                    ? (
                      <div>
                        <Gallery gallery={this.state.gallery} images={ this.state.allAds } histories={this.state.allHistories} increasePoint={ this.saveCount } updateSeen={this.updateSeen} updateCount={this.updateCount}/>
                        <Score counter={ this.state.countSeen}/>
                      </div>
                    )
                    : (
                      <div>
                        {isFetching
                        ? <p>Loading Your Responses</p>
                        : <div>
                          <Summary ads={this.state.allAds} histories={this.state.allHistories} historyInfo={this.state.historyInfo}/>
                          <Link to="/home" >Check out more galleries</Link>
                        </div>
                      }
                      </div>
                    )
                  }
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
      this.props.updateCount(index);
  };

  _onClickUnSeen(event) {
    const index = this.state.index + 1;
    this.setState({index: index, add: this.props.images[index]});
    this.props.updateSeen(index, false);
    this.props.increasePoint(false);
    this.props.updateCount(index);
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
      : <div></div>
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

const Summary = (props) => {
  return(
    <div>
      <h1>Your Responses</h1>
      {props.ads.map ((ad, index) => {
        const history = {
          has_been_seen: props.histories[index].has_been_seen,
          has_seen_total: props.historyInfo[index].has_seen_total,
          has_notseen_total: props.historyInfo[index].has_notseen_total,
          total: props.historyInfo[index].total,
        }

        return (<Result key={ad.id} ad={ad} history={history} />)
      })}
    </div>
  );
}

const Result = (props) => {
  return (
    <div>
      <Row className="d-flex justify-content-center">
      <Card className="w-75 mb-4">
        <Card.Body>
          <Card.Title>{props.ad.name}</Card.Title>

          <Card.Text>
            <img className="survey-img" src={props.ad.image}/>
          </Card.Text>

          <Card.Text>Your Response: {props.history.has_been_seen ? 'Seen' : 'Not Seen'}</Card.Text>
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



export default Survey;
