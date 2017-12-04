// External Dependencies
import React, { Component } from 'react';


class Slider extends Component {

  render() {
    const progress = this.props.progress * 100;

    const styles = {
      width: progress.toFixed(2) + '%'
    }

    return (
      <div className="slider">
        <div className="slider-controls">
          <div className="left-control"></div>
          <div className="right-control"></div>
        </div>
        <div className="progress-bar">
          <div className="progress" style={styles}></div>
        </div>
      </div>
    )
  }
}

export default Slider;
