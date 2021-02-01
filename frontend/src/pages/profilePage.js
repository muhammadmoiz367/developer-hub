import React, {Fragment, useEffect} from 'react'
import {Button, Spin} from 'antd'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { BiArrowBack } from 'react-icons/bi'
import { FaUserEdit } from 'react-icons/fa'

import {getProfile} from '../redux/actions/profile'
import Profile from '../components/profile'

const ProfilePage = ({getProfile, auth, profile: {profile, loading, error}, match}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    useEffect(()=>{
        getProfile(match.params.id)
    }, [getProfile])
    return (
        <Fragment>
            {profile===null || loading
                ? <Spin style={{marginLeft: '49%', marginTop: '1rem'}} indicator={antIcon} size="large" />
                : (
                <Fragment>
                    <Link to="/profiles">
                        <Button type="default" size="middle" style={{width: '15%'}} >
                            <BiArrowBack />
                            Back to profile
                        </Button>
                    </Link>
                    {auth.isAuthenticated && auth.loading===false && auth.user._id===profile.user._id && (
                        <Link to="/edit-profile">
                            <Button type="default" size="middle" style={{width: '15%', backgroundColor: 'red', color:' white', float: 'right'}} >
                                <FaUserEdit />
                                Edit profile
                            </Button>
                        </Link>
                    )}
                    <Profile profile={profile} />
                </Fragment>
                )
            }
        </Fragment>
    )
}

const mapStateToProps=state=>{
    return{
        profile: state.profile,
        auth: state.auth
    }
}

export default connect(mapStateToProps, {getProfile})(ProfilePage)
