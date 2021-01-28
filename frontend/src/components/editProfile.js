import React, { Fragment, useState, useEffect } from 'react'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Input, Select, Button } from 'antd';
import {FaUserAlt, FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaGithub} from 'react-icons/fa'
import {ImTwitter} from 'react-icons/im'
import {CgWebsite} from 'react-icons/cg'
import {MdLocationOn} from 'react-icons/md'
import {HiOfficeBuilding} from 'react-icons/hi'
import {SiSkillshare} from 'react-icons/si'

import {createProfile, getCurrentUserProfile} from '../redux/actions/profile'

const { Option } = Select;
const { TextArea } = Input;

const EditProfile = ({ profile: { profile, loading}, getCurrentUserProfile, createProfile, history }) => {
    const [toggleSocialLinks, setToggleSocialLinks]=useState(false);
    const [formData, setFormData]=useState({
        company: '',
        website: '',
        status: undefined,
        location: '',
        githubUsername: '',
        skills: '',
        bio: '',
        twitter: '',
        facebook: '',
        youtube: '',
        linkedin: '',
        instagram: ''
    })
    const {company, website, location, status, githubUsername, skills, bio, twitter, facebook, youtube, linkedin, instagram}=formData;

    const handleChange=e=>{
        setFormData({ 
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit=e=>{
        console.log(formData)
        createProfile(formData, history, true)
    }
    useEffect(()=>{
        getCurrentUserProfile();
        setFormData({
            company: loading || !profile.company ? "" : profile.company,
            website: loading || !profile.website ? "" : profile.website,
            location: loading || !profile.location ? "" : profile.location,
            status: loading || !profile.status ? "" : profile.status,
            skills: loading || !profile.skills ? "" : profile.skills.map(skill=> ` ${skill}`).join('.'),
            githubUsername: loading || !profile.githubUsername ? "" : profile.githubUsername,
            bio: loading || !profile.bio ? "" : profile.bio,
            twitter: loading || !profile.social ? "" : profile.social.twitter,
            facebook: loading || !profile.social ? "" : profile.social.facebook,
            instagram: loading || !profile.social ? "" : profile.social.instagram,
            linkedin: loading || !profile.social ? "" : profile.social.linkedin,
            youtube: loading || !profile.social ? "" : profile.social.youtube
        })
    }, [loading])

    return (
        <Fragment>
            <h1 className="large text-primary" >
                Create Your Profile
            </h1>
            <p className="lead" >
                <FaUserAlt /> {' '}
                Let's get some information to make your profile stand out
            </p>
            <br />
            <div className="profile-form">
                <Select size="large" placeholder="* Select Professional Status" style={{ width: '100%' }} value={status} onChange={(e)=>setFormData({...formData, status: e})} >
                    <Option value="Developer">Developer</Option>
                    <Option value="Junior Developer">Junior Developer</Option>
                    <Option value="Senior Developer">Senior Developer</Option>
                    <Option value="Manager">Manager</Option>
                    <Option value="Student or Learning">Student or Learning</Option>
                    <Option value="Instructor">Instructor or Teacher</Option>
                    <Option value="Intern">Intern</Option>
                    <Option value="Other">Other</Option>
                </Select>
                <small class="form-text">
                    Give us an idea of where you are at in your career
                </small>
                <br/>
                <Input size="large" placeholder="Company" name="company" prefix={<HiOfficeBuilding />} value={company} onChange={(e)=>handleChange(e)} />
                <small class="form-text">
                    Could be your own company or one you work for
                </small>
                <br/>
                <Input size="large" placeholder="Website" name="website" prefix={<CgWebsite />} value={website} onChange={(e)=>handleChange(e)} />
                <small class="form-text">
                    Could be your own or a company website
                </small>
                <br/>
                <Input size="large" placeholder="Location" name="location" prefix={<MdLocationOn />} value={location} onChange={(e)=>handleChange(e)} />
                <small class="form-text">
                    City & state suggested (eg. Boston, MA)
                </small>
                <br/>
                <Input size="large" placeholder="Skills" name="skills" prefix={<SiSkillshare />} value={skills} onChange={(e)=>handleChange(e)} />
                <small class="form-text">
                    Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
                </small>
                <br/>
                <Input size="large" placeholder="Github Username" name="githubUsername" prefix={<FaGithub />} value={githubUsername} onChange={(e)=>handleChange(e)} />
                <small class="form-text">
                    If you want your latest repos and a Github link, include your username
                </small>
                <br/>
                <TextArea rows={4} placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e)=>handleChange(e)} />
                <small class="form-text">
                    Tell us a little about yourself
                </small>
                <div class="my-2">
                    <button type="button" class="btn btn-light" onClick={()=>setToggleSocialLinks(!toggleSocialLinks)}>
                        Add Social Network Links
                    </button>
                </div>
                {toggleSocialLinks && (
                    <Fragment>
                        <div class="social-input">
                            <ImTwitter className="social-link" color="#17a2b8" size="1.5rem" />
                            <Input size="large" placeholder="Twitter url" name="twitter" value={twitter} onChange={(e)=>handleChange(e)} />
                        </div>
                        <br/>
                        <div class="social-input">
                            <FaFacebook className="social-link" color="#003668" size="1.5rem" />
                            <Input size="large" placeholder="Facebook url" name="facebook" value={facebook} onChange={(e)=>handleChange(e)} />
                        </div>
                        <br/>
                        <div class="social-input">
                            <FaYoutube className="social-link" color="#dc3545" size="1.5rem" />
                            <Input size="large" placeholder="Youtube url" name="youtube" value={youtube} onChange={(e)=>handleChange(e)} />
                        </div>
                        <br/>
                        <div class="social-input">
                            <FaLinkedin className="social-link" color="#003668" size="1.5rem" />
                            <Input size="large" placeholder="LinkedIn url" name="linkedin" value={linkedin} onChange={(e)=>handleChange(e)} />
                        </div>
                        <br/>
                        <div class="social-input">
                            <FaInstagram className="social-link" color="#dc3545" size="1.5rem" />
                            <Input size="large" placeholder="Instagram url" name="instagram" value={instagram} onChange={(e)=>handleChange(e)} />
                        </div>
                    </Fragment>
                )}
                <br/>
                <div className="profile-submit-btn">
                    <Link to='/dashboard'>
                        <Button shape="round" size="large" className="back-btn">
                            Go Back
                        </Button>
                    </Link>
                    <Button type="primary" shape="round" size="large" style={{width: '20%'}} onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </div>
            <br/>
        </Fragment>
    )
}

const mapStateToProps=state=>{
    return{
        profile: state.profile
    }
}

export default connect(mapStateToProps, { createProfile, getCurrentUserProfile })(withRouter(EditProfile))
