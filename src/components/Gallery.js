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
  constructor() {
    super();
    this.state = {
      name: '',
      category: '',
    }
  }

handleChange = (event) => {
  const {name, value} = event.target;
  this.setState({
    [name]: value
   })
}

handleSubmit = (event) => {
  event.preventDefault();
  const {name, category} = this.state;

  const gallery = {
    name: name,
    category: category,
  };

  axios.post('https://campaign-markt.herokuapp.com/galleries', {gallery}, {withCredentials: true}).then((response) => {
    console.log(response.data);
  })

}

  render() {
    return(
      <div>
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

                <Form.Group className="w-50">
                  <Form.Label>Ads</Form.Label>
                  <Form.Control as="select" name="ad_image" >
                    <option>image1</option>
                    <option>image2</option>
                  </Form.Control>
                </Form.Group>
                      <input type="submit" value="Create"className="btn btn-success mb-3" />

                </form>
            </div>
    );
  }
}






// class Gallery extends Component {
// constructor() {
//   super();
//   this.state = {
//     campaigninfo: []
//
//   };
//   this.saveCampaign = this.saveCampaign.bind(this);
// }
// saveCampaign(content) {
//   const allCampaignInfo = this.state.campaigninfo;
//   allCampaignInfo.push(content);
//   this.setState({campaigninfo: allCampaignInfo});
// }
//
//
//
//   render() {
//     return (
//       <div>
//         <CreateForm onSubmit={ this.saveCampaign } />
//       </div>
//     );
//   }
// }
//
// class CreateForm extends Component {
//   constructor() {
//     super();
//     this.state = { campaign: '', type: '' };
//     this._handleChange = this._handleChange.bind(this);
//     this._handleSubmit = this._handleSubmit.bind(this);
//   }
// _handleChange(event) {
//   this.setState({[event.target.name]: event.target.value});
// }
// _handleSubmit(event) {
//   event.preventDefault();
//   this.props.onSubmit(this.state);
//   this.setState({ campaign: '', type: '' });
// }
//
//   render() {
//     return (
//       <div>
//         <h3>Create Gallery</h3>
//           <form onSubmit={ this._handleSubmit }>
//           <Form.Group className="w-50">
//              <Form.Label>Gallery</Form.Label>
//              <Form.Control name="campaign" type="text" placeholder="Campaign name" value={ this.state.campaign } onChange={ this._handleChange } autoFocus required />
//           </Form.Group>
//           <Form.Group className="w-50">
//              <Form.Label>Type</Form.Label>
//              <Form.Control name="type" type="text" placeholder="Type" value={ this.state.type } onChange={ this._handleChange } autoFocus required />
//           </Form.Group>
//
//             <div>
//               <button className="btn btn-dark mb-3" >Add image</button>
//             </div>
//             <div>
//                 <input type="submit" value="Create"className="btn btn-success mb-3" />
//             </div>
//           </form>
//       </div>
//     );
//   }
// }

export default Gallery;
