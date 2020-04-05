import React, { Component } from 'react';

class Campaign extends Component {
constructor() {
  super();
  this.state = {
    campaigninfo: []

  };
  this.saveCampaign = this.saveCampaign.bind(this);
}
saveCampaign(content) {
  const allCampaignInfo = this.state.campaigninfo;
  allCampaignInfo.push(content);
  this.setState({campaigninfo: allCampaignInfo});
}



  render() {
    return (
      <div>
        <Form onSubmit={ this.saveCampaign } />
      </div>
    );
  }
}

class Form extends Component {
  constructor() {
    super();
    this.state = { campaign: '', type: '' };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }
_handleChange(event) {
  this.setState({[event.target.name]: event.target.value});
}
_handleSubmit(event) {
  event.preventDefault();
  this.props.onSubmit(this.state);
  this.setState({ campaign: '', type: '' });
}

  render() {
    return (
      <div>
        <h3>Create Campaign</h3>
          <form onSubmit={ this._handleSubmit }>
          <Form.Group className="w-50">
            <Form.Label>Campaign Name</Form.Label>
            <Form.Control name="campaign" type="text" placeholder="Campaign name" value={ this.state.campaign } onChange={ this._handleChange } required />
          </Form.Group>

          <Form.Group className="w-50">
             <Form.Label>Type</Form.Label>
             <Form.Control name="type" type="text" placeholder="Type" value={ this.state.type } onChange={ this._handleChange } />
          </Form.Group>

            <div>
              <button>Add image</button>
            </div>
            <div>
                <input type="submit" value="Create" className="btn btn-success mb-3"/>
            </div>
          </form>
      </div>
    );
  }
}

export default Campaign;
