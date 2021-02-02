import { v4 as uuidv4 } from 'uuid'
import { REMOVE_ALERT, SET_ALERT } from '../constants';

export const setAlert=(msg, alertType, timeout=3000)=>dispatch=>{
    const id=uuidv4();
    dispatch({
        type: SET_ALERT,
        data: {
            msg,
            alertType,
            id
        }
    })
    setTimeout(()=>
        dispatch({
            type: REMOVE_ALERT,
            data: id
        }), timeout)
}