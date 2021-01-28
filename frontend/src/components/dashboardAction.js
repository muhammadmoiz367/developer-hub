import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from 'antd';
import { FaUserEdit, FaGraduationCap} from 'react-icons/fa'
import WorkIcon from '@material-ui/icons/Work';

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="edit-profile">
                <Button size="middle" type="default" style={{width: '15%', backgroundColor: '#f4f4f4'}}>
                    <FaUserEdit />{' '} Edit Profile
                </Button>
            </Link>
            <Link to="add-experience">
                <Button size="middle" type="default" style={{width: '16%', marginLeft: '.5rem', backgroundColor: '#f4f4f4'}}>
                    <WorkIcon style={{fontSize: 15 }} />{' '} Add Experience
                </Button>
            </Link>
            <Link to="add-education">
                <Button size="middle" type="default" style={{width: '16%', marginLeft: '.5rem', backgroundColor: '#f4f4f4'}}>
                    <FaGraduationCap />{' '} Add Education
                </Button>
            </Link>
        </div>
    )
}

export default DashboardActions
