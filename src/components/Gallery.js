import React, { Component } from 'react';
import axios from 'axios';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
  NavItem
} from "react-bootstrap";



class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      allAds: [],
      allCheckedAds: [],
      user_id: props.user.id
      // user_id: 7
    }
  }
// Requesting All Ads from DB
fetchAdds = () => {
  const SERVER_URL = 'https://campaign-markt.herokuapp.com/requests/ads.json';
  // const SERVER_URL = 'http://localhost:3001/requests/ads.json';
  axios.get(SERVER_URL, {withCredentials: true}).then((results) => {
    this.setState({allAds: results.data.ads});
    console.log(this.state.allAds);

  })
}

componentDidMount() {
  this.fetchAdds();
}


handleCheck = (event) => {
  // console.log(event.target);
  const {name, value} = event.target;
  this.setState({
    [name]: value
  })
  const {allCheckedAds} = this.state;
  const newad = value;
  const index = allCheckedAds.indexOf(value);
  if (index >= 0) {(allCheckedAds).splice(index, 1);
  } else {
    allCheckedAds.push(newad);
  }
  // console.log(allCheckedAds.indexOf(value));
  this.setState({allCheckedAds: allCheckedAds});
  console.log(allCheckedAds);
}

handleChange = (event) => {
  const {name, value} = event.target;
  this.setState({
    [name]: value
   })
}

handleSubmit = (event) => {
  event.preventDefault();
  const {name, category, allCheckedAds, user_id} = this.state;

  const gallery = {
    name: name,
    category: category,
    ad_ids: allCheckedAds,
    user_id: user_id
  };
console.log(gallery);

const SERVER_URL = 'https://campaign-markt.herokuapp.com/galleries';
// const SERVER_URL = 'http://localhost:3001/galleries';
  axios.post(SERVER_URL, {gallery}, {withCredentials: true}).then((response) => {
    console.log("SUBMITTED");
    this.redirect();
  })

}
redirect = () => {
  this.props.history.push(`/gallery/user-galleries/${this.state.user_id}`);
}

  render() {
    const isFetching = this.state.isFetching;
    return (
      <div>
      {isFetching
      ? <p>Loading Create Gallery</p>
      : <div>
         <h3>Create Gallery</h3>
          <form onSubmit={ this.handleSubmit }>
          <Form.Group className="w-50">
             <Form.Label>Gallery</Form.Label>
             <Form.Control name="name" type="text" placeholder="Gallery name" value={ this.state.name } onChange={ this.handleChange } autoFocus required />
          </Form.Group>

          <Form.Group className="w-50">
             <Form.Label>Type</Form.Label>
             <Form.Control name="category" type="text" placeholder="Type" value={ this.state.category } onChange={ this.handleChange } autoFocus required />
          </Form.Group>

            <form onChange={this.handleCheck} >
              {this.state.allAds.map((ad) =>
                <div key={ad.id} className="mb-3">
                  <Form.Check name="allCheckedAds" type="checkbox" id="default-checkbox" label={ad.name} value={ad.id} />
                </div>
               )}
            </form>
            <input type="submit" value="Create"className="btn btn-success mb-3" />
          </form>
        </div>
      }
      </div>

    );
  }
}


export default Gallery;
