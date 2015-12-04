import React from 'react'
import { render } from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import rootReducer from '../reducers'

require('babel-polyfill');

let store = createStore(rootReducer)

// Render the main component into the dom
let rootElement = document.getElementById('app')
render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)
