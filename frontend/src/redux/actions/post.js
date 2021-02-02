import axios from "axios"

import { GET_POSTS, PROFILE_ERROR, UPDATE_LIKES, LIKES_ERROR, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, DELETE_COMMENT } from "../constants"
import {setAlert} from './alert'

//get all posts
export const getPosts=()=>async dispatch=>{
    try {
        const res=await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
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

//get posts by id
export const getPost=(postId)=>async dispatch=>{
    try {
        const res=await axios.get(`/api/posts/${postId}`)
        dispatch({
            type: GET_POST,
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


//like post
export const likePost=postId=> async dispatch=>{
    try {
        const res=await axios.put(`/api/posts/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            data: {
                id: postId,
                likes: res.data
            }
        })
    } catch (error) {
        dispatch({
            type: LIKES_ERROR,
            data: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//unlike post
export const unlikePost=postId=> async dispatch=>{
    try {
        const res=await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            data: {
                id: postId,
                likes: res.data
            }
        })
    } catch (error) {
        dispatch({
            type: LIKES_ERROR,
            data: {
                msg: error.response.statusText,
                status: error.response.status
            }
        })
    }
}

//delete post
export const deletePost= postId => async dispatch => {
    try {
        const res=await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type: DELETE_POST,
            data: postId
        })
        dispatch(setAlert('Post deleted', 'danger'));
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

//add post
export const addPost=postData=>async dispatch=>{
    const config={
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try {
        const res=await axios.post('/api/posts', postData, config);
        dispatch({
            type: ADD_POST,
            data: res.data
        })
        dispatch(setAlert('Post added', 'success'))
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

//add comment
export const addComment=(commentData, postId)=>async dispatch=>{
    const config={
        headers:{
            'Content-Type': 'application/json'
        }
    }
    try {
        const res=await axios.post(`/api/posts/comment/${postId}`, commentData, config);
        dispatch({
            type: ADD_COMMENT,
            data: res.data
        })
        dispatch(setAlert('Comment added', 'success'))
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

//delete comment
export const deleteComment=(postId, commentId)=>async dispatch=>{
    console.log(postId, commentId)
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        dispatch({
            type: DELETE_COMMENT,
            data: commentId
        })
        dispatch(setAlert('Comment deleted', 'danger'))
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