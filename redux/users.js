import * as ActionTypes from './ActionTypes'

export const users = (state = {
    isLoading: true,
    errMess: null,
    users: [],
    user: ''
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_USER:
            return { ...state, isLoading: false, errMess: null, users: action.payload, chatUser: state.chatUser }
        case ActionTypes.USER_LOADING:
            return { ...state, isLoading: true, errMess: null, users: [], chatUser: [] }
        case ActionTypes.USER_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, users: [], chatUser: [] }
        default:
            return state
    }
}