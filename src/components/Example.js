import React, { Component } from 'react'

export default class example extends Component {
  getImageId(pointId) {
    const list = require('../data/examples/list.json');
    let imageId, point;

    outer: for (imageId of list) {
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

    let left = point.x * 100 + '%';
    let top = point.y * 100 + '%';

    return (
      <div ref="example" className="example">
        <img className="example__img" src={require('../images/helen_1/' + imageId + '.jpg')} alt="Click to add point"/>
        <div className="example__point" style={{left, top}}></div>
      </div>
    )
  }
}
