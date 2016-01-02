import React, { Component } from 'react'

export default class example extends Component {
  getImageId(pointId) {
    const list = require('../data/examples/list.txt').split('\n').filter(Boolean);
    let imageId, point;

    outer: for (let path of list) {
      imageId = path.split('.')[0];
      const pointList = require('../data/examples/' + imageId + '.json');

      for (point of pointList) {
        if (point.id == pointId && point.visible) {
          break outer;
        }
      }
    }

    return {imageId, point}
  }
  render() {
    const { imageId, point } = this.getImageId(this.props.pointId)
    if (point) {
      let left = point.x * 100 + '%';
      let top = point.y * 100 + '%';

      return (
        <div className="example">
          <img className="example__img" src={'../images/helen/' + imageId + '.jpg'} alt="Click to add point"/>
          <div className="example__point" style={{left, top}}></div>
        </div>
      )
    } else {
      return (
        <div className="example">No examples available.</div>
      )
    }
  }
}
