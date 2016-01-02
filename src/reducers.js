import { ADD_POINT, UNDO_POINT, ADD_HIDDEN_POINT, NEXT_IMAGE } from './actions'
import steps from './data/steps'

const imageList = require('./images/helen/list.txt').split('\n').filter(Boolean);

function points(state, action) {
    switch (action.type) {
        case ADD_POINT:
            return [
                ...state.points, {
                    id: steps[state.points.length].id,
                    visible: true,
                    x: action.x,
                    y: action.y
                }
            ];
        case ADD_HIDDEN_POINT:
            return [
                ...state.points, {
                    id: steps[state.points.length].id,
                    visible: false
                }
            ];
        case UNDO_POINT:
            return state.points.slice(0, state.points.length - 1)
        case NEXT_IMAGE:
            return []
        default:
            return state.points;
    }
}

function image(state, action) {
    switch (action.type) {
        case NEXT_IMAGE:
            // TODO what if I've finally finished? :)
            return {
                index: state.image.index + 1,
                id: imageList[state.image.index + 1]
            }
        default:
            let index = state.image.index, id = state.image.id

            if (index === undefined) {
                index = Number(location.hash.replace(/^#/,"")) || 0
            }
            if (id === undefined) {
                id = imageList[index]
            }
            return { index, id }
    }
}

export default function(state = {points: [], image: {}}, action) {
    return {
        points: points(state, action),
        image: image(state, action)
    }
}
