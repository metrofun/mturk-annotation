import { ADD_POINT, UNDO_POINT, SKIP_HIDDEN_POINT, ADD_HIDDEN_POINT } from './actions'

function points(state, action) {
  switch (action.type) {
      case ADD_POINT:
          return [
              ...state.points, {
                  visible: true,
                  localId: state.step,
                  x: action.x,
                  y: action.y
              }
          ];
      case ADD_HIDDEN_POINT:
          return [
              ...state.points, {
                  visible: false,
                  localId: state.step
              }
          ];
      case UNDO_POINT:
          return state.points.slice(0, state.points.length - 1)
      case SKIP_HIDDEN_POINT:
          return [
              ...state.points, {
                  localId: state.step,
                  visible: false
              }
          ];
      default:
          return state.points;
  }
}

export default function(state = {points: []}, action) {
    return {
        points: points(state, action),
        imageUrl: require('./images/helen_1/233470867_1.jpg')
    }
}
