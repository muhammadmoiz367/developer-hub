import React from 'react'
import {Button} from 'antd'
import {connect} from 'react-redux'
import { FaCommentDots, FaThumbsDown, FaThumbsUp, FaTimes } from 'react-icons/fa'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import {likePost, unlikePost, deletePost} from '../redux/actions/post'

const PostItem = ({ post, auth, likePost, unlikePost, deletePost, showComments=true }) => {
    return (
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${post.user}`}>
              <img
                class="round-img"
                src={post.avatar}
                alt=""
              />
              <h4>{post.name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {post.text}
            </p>
             <p class="post-date">
                Posted on <Moment format="DD/MM/YYYY">{post.date}</Moment>
            </p>

            <div >
                <Button type="default" icon={<FaThumbsUp style={{color: post.likes.find(like=> like.user===auth.user._id) ? '#17a2b8' : 'black' }} />} style={{width: '10%', backgroundColor: '#f4f4f4'}} onClick={(e)=>likePost(post._id)} >
                    : {' '}{post.likes.length > 0 && (<span>{post.likes.length}</span>)}
                </Button>
                <Button type="default" icon={<FaThumbsDown />} style={{width: '10%', marginLeft: '.5rem',  backgroundColor: '#f4f4f4'}} onClick={(e)=>unlikePost(post._id)} >
                </Button>
                {showComments && (
                    <Link to={`/post/${post._id}`}>
                        <Button type="primary" icon={<FaCommentDots style={{marginRight: '5px'}} />} style={{width: '90%', marginLeft: '.5rem'}}>
                            {' '} Discussion {post.comments.length > 0 && (<span>: {post.comments.length}</span>)}
                        </Button>
                    </Link>
                )}
                {!auth.loading && post.user===auth.user._id && (
                    <Button type="primary" icon={<FaTimes />} onClick={(e)=>deletePost(post._id)} style={{width: '10%', marginLeft: '.5rem'}} danger >
                    </Button>
                )}
            </div>
          </div>
        </div>
    )
}


const mapStateToProps=state=>{
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps, {likePost, unlikePost, deletePost})(PostItem)