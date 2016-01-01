require('normalize.css');
require('styles/App.css');

import Editor from './Editor'
import Example from './Example'
// import Button from './Button'
import steps from '../data/steps'
import React from 'react';
import { connect } from 'react-redux'
import { addPoint, undoPoint, addHiddenPoint } from '../actions'

class App extends React.Component {
    onKeyDown(e) {
        var evtobj = window.event? event : e
        if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
            this.dispatch((undoPoint()))
        }
    }
    dispatch() {
        if (this.props.points.length < steps.length) {
            this.props.dispatch.apply(this, arguments)
        }
    }
    componentWillMount() {
        this.onKeyDown = this.onKeyDown.bind(this)
        this.dispatch = this.dispatch.bind(this)
        window.addEventListener('keydown', this.onKeyDown, true);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown, true);
    }
    render() {
        const { points, imageId} = this.props
        let sidebar

        if (this.props.points.length < steps.length) {
            const data = steps[points.length]
            sidebar = <div className="app__sidebar">
                <h3 className="title">Click on:&nbsp;<span className="title__emphasize">{data.label}</span></h3>
                <div className="alert">
                    <ul>
                        <li>Click only in the correct order!</li>
                        <li>Annotate only single face closest to the center</li>
                    </ul>
                </div>
                <div className="app__controls">
                    <button className="button button_style_info"
                        onClick={() => this.dispatch((undoPoint()))}>undo (ctrl+z)</button>
                    <button className="button button_style_danger"
                        onClick={() => this.dispatch(addHiddenPoint())}>point is not visible(right click)</button>
                </div>
                <div className="app__example">
                    <div className="app__example-title">Example</div>
                    <Example  pointId={steps[this.props.points.length].id}/>
                </div>
            </div>
        } else {
            const url = 'data:application/json,' + JSON.stringify(this.props.points);
            sidebar = <div className="app__sidebar">
                <h3 className="title">Finished, thank you!</h3>
                <div className="app__controls">
                    <a className="button button_style_info" download={imageId + '.json'} href={url}>Download Results</a>
                </div>
            </div>
        }

        return (
            <div className="app">
                <Editor
                    points={points}
                    onAddClick={(x, y) => this.dispatch(addPoint(x, y))}
                    onContextMenu={(e) => {
                        this.dispatch(addHiddenPoint());
                        e.preventDefault();
                        return false;
                    }}
                    imageId={imageId}/>
                {sidebar}
            </div>
        );

    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        points: state.points,
        imageId: state.imageId
    }
}

export default connect(select)(App)
