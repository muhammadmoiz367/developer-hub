import React, { Fragment } from 'react'
import { FaCheck } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { Button } from 'antd';

const ProfileItem = ({profile}) => {
    return (
        <Fragment>
            <div className="profile bg-light">
            <img
                    className="round-img"
                    src={profile.user.avatar}
                    alt=""
                />
                <div>
                    <h2>{profile.user.name}</h2>
                    <p>{profile.status} {profile.company && <span>at {profile.company}</span>}</p>
                    <Link to={`profile/${profile.user._id}`}>
                        <Button type="primary" size="middle" style={{width: '40%', marginLeft: '0rem'}} >
                            View profile
                        </Button>
                    </Link>
                </div>
                <ul>
                    {profile.skills.slice(0, 4).map((skill, index)=>(
                        <li key={index} className="text-primary">
                            <FaCheck /> {skill}
                        </li>
                    ))}
                </ul>
            </div>
        </Fragment>
    )
}

export default ProfileItem
