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
      // user_id: props.user.id,
      // galleryId: props.match.params.galleryId,
      galleryId: 4,
      user_id: 5,
      isChecked: []
    }
  }

fetchGallery = () => {
  this.setState({isFetching: true});
  // const SERVER_URL = 'https://campaign-markt.herokuapp.com/galleries/'+ this.state.galleryId +'/edit.json';
  const SERVER_URL = 'http://localhost:3001/galleries/'+ this.state.galleryId+'/edit.json';
  axios.get(SERVER_URL, {withCredentials: true}).then((results) => {
    console.log(results);
    this.setState({

      name: results.data.gallery.name,
      category: results.data.gallery.category,
      allAds: results.data.ads,
      allCheckedAds: results.data.gallery_ads

    });
    this.setState({isFetching: false});
console.log(this.state.allCheckedAds);
  })
}

  componentDidMount() {
    this.fetchGallery();
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
// const SERVER_URL = 'https://campaign-markt.herokuapp.com/galleries/'+ this.state.galleryId +'.json';
const SERVER_URL = 'http://localhost:3001/galleries/'+ this.state.galleryId +'.json';
  axios.patch(SERVER_URL, {gallery}, {withCredentials: true}).then((response) => {

  console.log("SUBMITTED");
  this.redirect();
  })

}
redirect = () => {
  this.props.history.push(`/gallery/${ this.state.user_id }`)
}

toggleChange = () => {
  this.setState({isChecked: !this.state.isChecked});
}

  render() {
    return(
      <div>
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
                // let adchecked = false;
                const {allCheckedAds} = this.state;
                console.log(allCheckedAds);
                for (let i = 0; i < allCheckedAds.length; i++ ) {
                    console.log(allCheckedAds[i].id);
                  if ( allCheckedAds[i].id === ad.id ) {
                    // this.setState({isChecked: true})

                  }
                }


                return (
                <div key={ad.id} className="mb-3">
                <Form.Check name="allCheckedAds" type="checkbox" id="default-checkbox" label={ad.name} value={ad.id} checked={ this.state.isChecked } onChange={ this.toggleChange } />

                 </div>)
               }

             )}
          </form>

                <input type="submit" value="Create"className="btn btn-success mb-3" />

          </form>
      </div>
    );
  }
}



export default EditGallery;
