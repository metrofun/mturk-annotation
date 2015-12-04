import { ADD_POINT, UNDO_POINT, ADD_HIDDEN_POINT } from './actions'
import steps from './data/steps'

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
      default:
          return state.points;
  }
}

export default function(state = {points: []}, action) {
    return {
        points: points(state, action),
        imageId: '1208068331_1'
    }
}
