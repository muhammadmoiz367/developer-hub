import { GET_POST, GET_POSTS, PROFILE_ERROR, LIKES_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, ADD_COMMENT, DELETE_COMMENT } from "../constants";

const initialState={
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function(state=initialState, action){
    switch(action.type){
        case ADD_POST: 
            return{
                ...state,
                posts: [action.data, ...state.posts],
                loading: false
            }
        case GET_POSTS:
            return{
                ...state,
                posts: action.data,
                loading: false
            }
        case GET_POST:
            return{
                ...state,
                post: action.data,
                loading: false
            }
        case ADD_COMMENT:
            return{
                ...state,
                post: {...state.post, comments: action.data},
                loading: false
            }
        case DELETE_COMMENT:
            return{
                ...state,
                post: {...state.post, comments: state.post.comments.filter(comment=>comment._id !== action.data)},
                loading: false
            }
        case UPDATE_LIKES:
            return{
                ...state,
                loading: false,
                posts: state.posts.map(post=> post._id === action.data.id 
                    ? { ...post, likes: action.data.likes }
                    : post
                )
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts.filter(post=>post._id !== action.data),
                loading: false
            }
        case PROFILE_ERROR:
        case LIKES_ERROR:
            return{
                ...state,
                error: action.data,
                loading: false
            }
        default: 
            return state
    }
}