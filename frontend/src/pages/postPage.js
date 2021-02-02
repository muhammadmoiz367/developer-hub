import React, { Fragment, useEffect } from 'react'
import {connect} from 'react-redux';
import {Button, Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import {getPost, addComment} from '../redux/actions/post'
import PostItem from '../components/postItem';
import PostAddForm from '../components/postAddForm';
import CommentItem from '../components/commentItem';


const PostPage = ({getPost, addComment, post: {post, loading}, match}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    useEffect(()=>{
        getPost(match.params.id)
    }, [getPost])
    return loading || post===null
    ? <Spin style={{marginLeft: '49%', marginTop: '1rem'}} indicator={antIcon} size="large" />
    : (
       <Fragment>
           <Link to="/posts">
                <Button type="default" size="middle" style={{width: '15%'}} >
                    <BiArrowBack />
                    Back to post
                </Button>
            </Link>
           <PostItem post={post} showComments={false} />
           <PostAddForm formHandle={addComment} placeholder="Write a comment..." postId={post._id} rows={3} />
           <div class="comments">
               {post.comments.map(comment=>(
                   <CommentItem comment={comment} postId={post._id} />
               ))}
           </div>
       </Fragment> 
    )
}

const mapStateToProps=state=>{
    return{
        post: state.post
    }
}

export default connect(mapStateToProps, {getPost, addComment})(PostPage)
