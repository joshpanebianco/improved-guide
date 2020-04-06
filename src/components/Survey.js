import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      ]
    }

    this.saveCount = this.saveCount.bind(this);
    this.updateSeen = this.updateSeen.bind(this);
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
        <h2>Campaign's Name</h2>
        <h3>User's Name</h3>
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
          <div>
             <img src={this.state.add.image}/>
          </div>
          <div>
              <button onClick={ this._onClickSeen } >Seen</button>
              <button onClick={ this._onClickUnSeen }>Not seen</button>
          </div>
        </div>
      )
      : <img src='https://i.pinimg.com/474x/8e/44/6b/8e446b0c8ff905d51d96b8a9e01f296c.jpg'/>
    }

};

const Score = (props) => {
  return(
    <div>
     <p>Your Score: {props.counter}</p>
     <Link className="nav-style" to="/home">
       <button type="submit">back to take another test</button>
     </Link>

    </div>
  );
}



export default Survey;
