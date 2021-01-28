import { REMOVE_ALERT, SET_ALERT } from "../constants";

const initialState=[];

export default function(state=initialState, action){
    switch(action.type){
        case SET_ALERT:
            return [
                ...state,
                action.data
            ]
        case REMOVE_ALERT: 
            return state.filter(alert=>alert.id !== action.data)
        default: 
            return state
    }
}