export const ADD_POINT = 'ADD_POINT'
export const UNDO_POINT = 'UNDO_POINT'
export const ADD_HIDDEN_POINT = 'ADD_HIDDEN_POINT'
export const SKIP_HIDDEN_POINT = 'SKIP_HIDDEN_POINT'

export function addPoint(x, y) {
    return {
        type: ADD_POINT,
        x, y
    }
}

export function undoPoint() {
    return {
        type: UNDO_POINT
    }
}

export function addHiddenPoint() {
    return {
        type: ADD_HIDDEN_POINT
    }
}
