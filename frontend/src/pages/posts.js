import React, { Fragment, useEffect } from 'react'
import {connect} from 'react-redux'
import {Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import {getPosts, addPost} from '../redux/actions/post'
import PostItem from '../components/postItem'
import PostAddForm from '../components/postAddForm'

const Posts = ({getPosts, addPost, post: {posts, loading}}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    useEffect(()=>{
        getPosts()
    }, [getPosts])
    return loading 
    ? <Spin style={{marginLeft: '49%', marginTop: '1rem'}} indicator={antIcon} size="large" />
    : (
        <Fragment>
            <h1 class="large text-primary">
                Posts
            </h1>
            <p class="lead"><i class="fas fa-user"></i> Welcome to the community!</p>
            <PostAddForm headerText="Say Something..." formHandle={addPost} placeholder="Create a post" />
            <div class="posts">
            {posts.map(post=>(
                <PostItem key={post._id} post={post} />
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

export default connect(mapStateToProps, {getPosts, addPost})(Posts)
