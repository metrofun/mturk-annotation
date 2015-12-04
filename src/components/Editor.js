import React, { Component } from 'react'

export default class Editor extends Component {
  onAddClick(e) {
    if (this.props.onAddClick) {
      let x = (e.pageX - this.refs.editor.offsetLeft) / this.refs.editor.offsetWidth;
      let y = (e.pageY - this.refs.editor.offsetTop) / this.refs.editor.offsetHeight;
      this.props.onAddClick(x, y);
    }
  }
  render() {
    return (
      <div ref="editor" className="editor" onClick={this.onAddClick.bind(this)}>
        <img className="editor__img" src={require('../images/helen_1/' + this.props.imageId + '.jpg')} alt="Click to add point"/>
        {this.props.points.map(function(point) {
          if (point.visible) {
            let left = point.x * 100 + '%';
            let top = point.y * 100 + '%';
            return <div className="editor__point" style={{left, top}}></div>
          }
        })}
      </div>
    )
  }
}
