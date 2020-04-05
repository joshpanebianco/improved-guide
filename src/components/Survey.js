import React, { Component } from 'react';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";

class Survey extends Component {
  constructor() {
    super();
    this.state = {
      countSeen: 0,
      countUnseen: 0,
      adds: [
        {id: 1, image: 'https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/1/9/0/3/2903091-5-eng-GB/Extending-equity-and-iconic-appeal-Coca-Cola-unites-brands-with-global-campaign_wrbm_medium.jpg'}
      ]
    }

    this.saveAddInfo = this.saveAddInfo.bind(this);
  }

saveAddInfo(content) {
  console.log(content);
  if (content === true) {
    this.setState({countSeen: this.state.countSeen + 1});
  } else {
    this.setState({countUnSeen: this.state.countUnSeen + 1});
  }

};

  render() {
    return (
      <div>
        <h2>Campaign's Name</h2>
        <h3>User's Name</h3>
        <Gallery image={ this.state.adds } onSubmit={ this.saveAddInfo }/>
        <Score counter={ this.state.countSeen}/>
      </div>
    );
  }
};



class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      seen: '',


    }
    this._onClickSeen = this._onClickSeen.bind(this);
    this._onClickUnSeen = this._onClickUnSeen.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    }


  _onClickSeen() {
    this.setState({seen: true});

  };

  _onClickUnSeen() {
    this.setState({seen: false});
  };

  _onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.seen);
  }

  render(props) {
    return(
      <div>
        {this.props.image.map( (a) => <img src={ a.image } /> )}
        <div>
          <form onSubmit={ this._onSubmit }>
            <button onClick={ this._onClickSeen }>Seen</button>
            <button onClick={ this._onClickUnSeen } >Not seen</button>
          </form>
        </div>
      </div>
    );
  }
};

const Score = (props) => {
  return(
    <div>
    { <p>Your Score: {props.counter}</p> }
    </div>
  );
}



export default Survey;
