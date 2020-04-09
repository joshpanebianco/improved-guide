import React from 'react';

class DataBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seenNot: props.history.has_notseen_total,
      seen: props.history.has_seen_total,
      total: props.history.total,
      seenNotBoxValue: props.history.has_notseen_total,
      seenBoxValue: props.history.has_seen_total,
      percentSeen: (parseInt(props.history.has_seen_total) / parseInt(props.history.total)),
      percentNotSeen: (parseInt(props.history.has_notseen_total) / parseInt(props.history.total)),
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

  }

  handleMouseEnter() {
    this.setState({
      seenBoxValue: Math.floor(this.state.percentSeen*100)+'%',
      seenNotBoxValue: Math.floor(this.state.percentNotSeen*100)+'%',
    });
  }

  handleMouseLeave() {
    this.setState({
      seenBoxValue: this.state.seen,
      seenNotBoxValue: this.state.seenNot,
    });
  }

  render() {
    const widthSeenStyle = {width: `${this.state.percentSeen * 300}px`};
    const widthNotSeenStyle = {width: `${this.state.percentNotSeen * 300}px`};
    return (
      <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} id="data-bar-container">
        <div style={widthSeenStyle} className="seen-bar-container inside-container">{this.state.seenBoxValue}</div>
        <div style={widthNotSeenStyle} className="not-seen-bar-container inside-container">{this.state.seenNotBoxValue}</div>
      </div>
    );
  }
}

export default DataBar;
