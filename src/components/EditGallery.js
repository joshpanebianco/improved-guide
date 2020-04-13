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



class EditGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      name: '',
      category: '',
      allAds: [],
      allCheckedAds: [],
      user_id: props.user.id,
      galleryId: props.match.params.galleryId,
      // galleryId: 8,
      // user_id: 6,
      isAdChecked: [],
    }
  }

fetchGallery = () => {
  this.setState({isFetching: true});
  const SERVER_URL = 'https://campaign-markt.herokuapp.com/galleries/'+ this.state.galleryId +'/edit.json';
  // const SERVER_URL = 'http://localhost:3001/galleries/'+ this.state.galleryId+'/edit.json';
  axios.get(SERVER_URL, {withCredentials: true}).then((results) => {
    const isAdChecked = [];
    for (let i = 0; i < results.data.ads.length; i++) {
      isAdChecked.push(false);
    }
    results.data.ads.forEach((ad, index) => {
      results.data.gallery_ads.forEach((checked_ad) => {
        if (ad.id === checked_ad.id) {
          isAdChecked[index] = true;
        }
      })
    })

    // convert gallery_ads to ad ids and put into array to give to allCheckAds
    const allCheckedAds = [];
    results.data.gallery_ads.forEach((ad) => {
      allCheckedAds.push(ad.id.toString());
    })

    this.setState({

      name: results.data.gallery.name,
      category: results.data.gallery.category,
      allAds: results.data.ads,
      allCheckedAds: allCheckedAds,
      isAdChecked: isAdChecked,

    });
    this.setState({isFetching: false});

  })
}

  componentDidMount() {
    this.fetchGallery();
  }

toggleChange = (index) => {
  const currentCheck = this.state.isAdChecked[index];
  const isAdChecked = this.state.isAdChecked;
  isAdChecked[index] = !isAdChecked[index]
  console.log(isAdChecked[index]);
  this.setState({isAdChecked: isAdChecked});
}

handleCheck = (event) => {

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
  console.log(allCheckedAds);
  this.setState({allCheckedAds: allCheckedAds});
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
const SERVER_URL = 'https://campaign-markt.herokuapp.com/galleries/'+ this.state.galleryId +'.json';
// const SERVER_URL = 'http://localhost:3001/galleries/'+ this.state.galleryId +'.json';
  axios.patch(SERVER_URL, {gallery}, {withCredentials: true}).then((response) => {

  console.log("SUBMITTED");
  this.redirect();
  })

}
redirect = () => {
  this.props.history.push(`/gallery/user-galleries/${ this.state.user_id }`)
}

// Delete a Gallery
handleDelete = (event) => {
  event.preventDefault();
  const {name, category, allCheckedAds, user_id} = this.state;

  const gallery = {
    name: name,
    category: category,
    ad_ids: allCheckedAds,
    user_id: user_id
  };

  const SERVER_URL = 'https://campaign-markt.herokuapp.com/galleries/'+ this.state.galleryId +'.json';
  // const SERVER_URL = 'http://localhost:3001/galleries/'+ this.state.galleryId +'.json';
  axios.delete(SERVER_URL, {gallery}, {withCredentials: true}).then((result) => {
    console.log(result);
    console.log(result.data);
    this.redirect();
  })

}

  render() {
    const isFetching = this.state.isFetching;
    return(
      <div>
        {isFetching
        ? <p>Loading Edit Gallery</p>
        : <div>
            <h3>Edit Gallery</h3>
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
                {this.state.allAds.map((ad, index) =>
                  {
                    return (
                    <div key={ad.id} className="mb-3">
                    <Form.Check name="allCheckedAds" type="checkbox" id="default-checkbox" label={ad.name} value={ad.id} checked={ this.state.isAdChecked[index] } onChange={() => this.toggleChange(index) } />

                     </div>)
                   }

                 )}
              </form>
                  <div>
                    <input type="submit" value="Create"className="btn btn-success mb-3" />
                  </div>
              </form>

              <form onSubmit={this.handleDelete}>
                <input type="submit" value="Delete" className="btn btn-success mb-3"/>
              </form>
            </div>
          }
      </div>
    );
  }
}



export default EditGallery;
