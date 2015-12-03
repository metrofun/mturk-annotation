require('normalize.css');
require('styles/App.css');

import Editor from './Editor'
// import Button from './Button'
import steps from '../data/steps'
import React from 'react';
import { connect } from 'react-redux'
import { addPoint, undoPoint, addHiddenPoint } from '../actions'

class App extends React.Component {
    onKeyDown(e) {
        var evtobj = window.event? event : e
        if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
            this.props.dispatch((undoPoint()))
        }
    }
    componentDidMount() {
        this.onKeyDown = this.onKeyDown.bind(this);
        window.addEventListener('keydown', this.onKeyDown, true);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown, true);
    }
    render() {
        const { dispatch, points, imageUrl} = this.props

        if (points.length < steps.length) {
            const data = steps[points.length]
            return (
                <div className="app">
                    <Editor
                        points={points}
                        onAddClick={(x, y) => dispatch(addPoint(x, y))}
                        imageUrl={imageUrl}/>
                    <div className="app__sidebar">
                        <h3 className="title">Click on:&nbsp;<span className="title__emphasize">{data.label}</span></h3>
                        <div className="alert">
                            <ul>
                                <li>Click only in the correct order!</li>
                                <li>Always check example, when not sure!</li>
                            </ul>
                        </div>
                        <div className="app__controls">
                            <button className="button button_style_info"
                                onClick={() => dispatch((undoPoint()))}>undo (ctrl+z)</button>
                            <button className="button button_style_danger"
                                onClick={() => dispatch(addHiddenPoint())}>point is not visible</button>
                        </div>
                        <div className="example">
                            <div className="example__title">Example</div>
                            <Editor
                                points={points}
                                onAddClick={(x, y) => dispatch(addPoint(x, y))}
                                imageUrl={imageUrl}/>
                        </div>
                    </div>
                </div>
            );
        } else {
            window.removeEventListener('keydown', this.onKeyDown, true);
            return <div className="app">
                FINISHED
            </div>
        }
    }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        points: state.points,
        imageUrl: state.imageUrl
    }
}

export default connect(select)(App)
