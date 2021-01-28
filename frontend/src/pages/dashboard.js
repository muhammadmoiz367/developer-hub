import React, { Fragment, useEffect } from 'react'
import {connect} from 'react-redux'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import {FaUserAlt} from 'react-icons/fa'
import {TiUserDelete} from 'react-icons/ti'

import {getCurrentUserProfile, deleteAccount} from '../redux/actions/profile'
import DashboardActions from '../components/dashboardAction'
import Experience from '../components/experience'
import Education from '../components/education'


function Dashboard({ auth: {user}, profile: {profile, loading}, getCurrentUserProfile, deleteAccount}) {
    useEffect(()=>{
        getCurrentUserProfile()
    }, [])
    console.log(profile)
    return (
        <Fragment>
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead">
                <FaUserAlt /> Welcome {user && user.name}
            </p>
            <span>
            <Button className="delete-account-btn"  type="primary" danger size="middle" onClick={()=>deleteAccount()} >
                <TiUserDelete style={{verticalAlign: 'middle'}} size="23px" />{'  '}
                Delete account
            </Button>
            </span>
            {profile !== null 
                ? (
                    <Fragment>
                        <DashboardActions />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />
                    </Fragment>
                )
                : (
                    <Fragment>
                        <p style={{fontSize: '1.2rem', marginLeft: '2.5rem', marginTop: '1.5rem'}} >You does not have a user profile, please add some info</p>
                        <Link to="/create-profile" >
                            <Button type="primary" shape="round" style={{marginLeft: '2.5rem', width: '20%'}}>
                                Create profile
                            </Button>
                        </Link>
                    </Fragment>
                )
            }
        </Fragment>
    )
}

const mapStateToProps=state=>{
    return{
        auth: state.auth,
        profile: state.profile
    }
}

export default connect(mapStateToProps, { getCurrentUserProfile, deleteAccount })(Dashboard)
