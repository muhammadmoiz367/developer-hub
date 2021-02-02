import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'

import {deleteComment} from '../redux/actions/post'
import { Button } from 'antd'
import { FaTimes } from 'react-icons/fa'

const CommentItem = ({comment, deleteComment, auth, postId}) => {
    return (
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${comment.user}`}>
              <img
                class="round-img"
                src={comment.avatar}
                alt=""
              />
              <h4>{comment.name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {comment.text}
            </p>
             <p class="post-date">
                Posted on <Moment format="DD/MM/YYYY">{comment.date}</Moment>
            </p>
            {!auth.loading && comment.user===auth.user._id && (
                <Button type="primary" icon={<FaTimes />} onClick={(e)=>deleteComment(postId, comment._id)} style={{width: '10%', marginTop: '-4rem', float: 'right'}} danger >
                </Button>
            )}
          </div>
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps, {deleteComment})(CommentItem)
