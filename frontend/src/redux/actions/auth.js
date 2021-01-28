import axios from 'axios'

import { AUTH_ERROR, SIGNUP_ERROR, SIGNUP_SUCCESS, USER_LOADED, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE } from '../constants'
import {setAlert} from './alert'
import setAuthToken from '../../utils/setAuthToken'

export const loadAuthUser=()=> async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res=await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            data: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

export const signUp=({name, email, password})=> async dispatch=>{
    const newUser={
        name,
        email,
        password
    }
    try {
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const body=JSON.stringify(newUser)
        const res=await axios.post('/api/users', body, config)
        dispatch({
            type: SIGNUP_SUCCESS,
            data: res.data
        })
        dispatch(loadAuthUser())
        console.log(res.data)
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: SIGNUP_ERROR
        })
    }
}

export const logIn=(email, password)=> async dispatch=>{
    const newUser={
        email,
        password
    }
    try {
        const config={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const body=JSON.stringify(newUser)
        const res=await axios.post('/api/auth', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            data: res.data
        })
        dispatch(loadAuthUser())
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_ERROR
        })
    }
}

export const signOut=()=>dispatch=>{
    dispatch({
        type: LOGOUT
    })
    dispatch({
        type: CLEAR_PROFILE
    })
}