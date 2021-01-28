import axios from 'axios';
import { CLEAR_PROFILE, DELETE_ACCOUNT, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from '../constants';
import {setAlert} from './alert'

//get current profile
export const getCurrentUserProfile = () => async dispatch => {
    try {
        const res=await axios.get('api/profile/me');
        dispatch({
            type: GET_PROFILE,
            data: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            data: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//create or edit profile
export const createProfile=(formData, history, edit=false)=> async dispatch =>{
    try {
        const config={
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res=await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            data: res.data
        })
        console.log(res.data)
        dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'))
        if(!edit){
            history.push('/dashboard')
        }
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            data: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//Add experience
export const addExperience=(formData, history)=> async dispatch =>{
    try {
        const config={
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res=await axios.put('/api/profile/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            data: res.data
        })
        dispatch(setAlert('Experience added', 'success'))
        history.push('/dashboard')
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            data: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//Delete experience
export const deleteExperience=id=>async dispatch=>{
    try {
        const res=await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            data: res.data
        })
        dispatch(setAlert('Experience removed', 'danger'))
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            data: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//Add education
export const addEducation=(formData, history)=> async dispatch =>{
    try {
        const config={
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res=await axios.put('/api/profile/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            data: res.data
        })
        dispatch(setAlert('Education added', 'success'))
        history.push('/dashboard')
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            data: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//Delete education
export const deleteEducation=id=>async dispatch=>{
    try {
        const res=await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            data: res.data
        })
        dispatch(setAlert('Education removed', 'danger'))
    } catch (error) {
        const errors=error.response.data.errors
        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            data: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//Delete account
export const deleteAccount=()=>async dispatch=>{
    if(window.confirm('Are you sure? This action CANNOT be undone')){
        try {
            const res=await axios.delete(`/api/profile`);
            dispatch({
                type: CLEAR_PROFILE
            })
            dispatch({
                type: DELETE_ACCOUNT
            })
            dispatch(setAlert('Your account has been permanently removed', 'danger'))
        } catch (error) {
            const errors=error.response.data.errors
            if(errors){
                errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')))
            }
            dispatch({
                type: PROFILE_ERROR,
                data: {
                    msg: error.response.statusText,
                    status: error.response.status
                }
            })
        }
    }
}