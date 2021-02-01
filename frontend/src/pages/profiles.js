import React, { Fragment, useEffect } from 'react'
import {connect} from 'react-redux'
import {Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { FaConnectdevelop } from 'react-icons/fa'

import {getAllProfiles} from '../redux/actions/profile'
import ProfileItem from '../components/profileItem';

const Profiles = ({profile: {profiles, loading}, getAllProfiles}) => {
    useEffect(()=>{
        getAllProfiles()
    }, [getAllProfiles])
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
        <Fragment>
            {loading 
                ? <Spin style={{marginLeft: '45%'}} indicator={antIcon} size="large" />
                : (
                    <Fragment>
                        <h1 className="large text-primary">Developers</h1>
                        <p className="lead">
                            <FaConnectdevelop /> Browse and connect with developers
                        </p>
                        <div className="profiles">
                            {profiles.length < 0
                                ? (<h1 className="lead">No profile to show...</h1>)
                                : profiles.map((profile, index)=>(
                                    <ProfileItem key={profile._id} profile={profile} />
                                ))
                            }
                        </div>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

const mapStateToProps=(state)=>{
    return{
        profile: state.profile
    }
}

export default connect(mapStateToProps, {getAllProfiles})(Profiles)
