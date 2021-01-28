import { AUTH_ERROR, LOGIN_ERROR, LOGIN_SUCCESS, SIGNUP_ERROR, SIGNUP_SUCCESS, USER_LOADED, LOGOUT, DELETE_ACCOUNT } from "../constants";

const initialState={
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
}

export default function(state=initialState, action){
    switch(action.type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.data.user
            }
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.data.token)
            return{
                ...state,
                ...action.data,
                isAuthenticated: true,
                loading: false
            }
        case SIGNUP_ERROR:
        case LOGIN_ERROR:
        case AUTH_ERROR:
        case LOGOUT:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token')
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default:
            return state
    }
}