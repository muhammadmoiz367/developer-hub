import React, { Fragment, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { FaCheck, FaFacebook, FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { BsPlusCircleFill } from 'react-icons/bs'
import Moment from 'react-moment'
import {connect} from 'react-redux'
import {Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import {getGithubRepos} from '../redux/actions/profile'


const Profile = ({profile, auth, repos, getGithubRepos}) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    useEffect(()=>{
        getGithubRepos(profile.githubUsername)
    }, [getGithubRepos])
    console.log(repos)
    return (
        <Fragment>
            <div class="profile-grid my-1">
                {/* Profile top */}
                <div class="profile-top bg-primary p-2">
                    <img
                        class="round-img my-1"
                        src={profile.user.avatar}
                        alt=""
                    />
                    <h1 class="large">{profile.user.name}</h1>
                    <p class="lead">{profile.status} {profile.company && <span>at {profile.company}</span>}</p>
                    {profile.location && <p>{profile.location}</p>}
                    <div class="icons my-1">
                        {profile.website && (
                            <a href={profile.website} target="_blank" rel="noopener noreferrer">
                                <FaGlobe size="2x" />
                            </a>
                        )}
                        {profile.social && profile.social.twitter && (
                            <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                                <FaTwitter />
                            </a>
                        )}
                        {profile.social && profile.social.facebook && (
                            <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                                <FaFacebook />
                            </a>
                        )}
                        {profile.social && profile.social.linkedIn && (
                            <a href={profile.social.linkedIn} target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </a>
                        )}
                        {profile.social && profile.social.youtube && (
                            <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                                <FaYoutube />
                            </a>
                        )}
                        {profile.social && profile.social.instagram && (
                            <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                        )}
                    </div>
                </div>
                {/* Profile about */}
                <div class="profile-about bg-light p-2">
                    {profile.bio && (
                        <Fragment>
                            <h2 class="text-primary">{profile.user.name.trim().split(" ")[0]}'s Bio</h2>
                            <p>{profile.bio}</p>
                            <div class="line"></div>
                        </Fragment>
                    )}
                    <h2 class="text-primary">Skill Set</h2>
                    <div class="skills">
                        {profile.skills.map((skill, index)=>(
                            <div class="p-1" key={index}>
                                <FaCheck /> {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Experience */}
            <div class="profile-exp bg-white p-2">
                <h2 class="text-primary">Experience</h2>
                {profile.experience.length>0
                    ? (<Fragment>
                        {profile.experience.map(exp=>(
                            <div key={exp._id}>
                                <h3 class="text-dark">{exp.company}</h3>
                                <p>
                                    <Moment format="DD/MM/YYYY">{exp.from}</Moment> - {!exp.to ? 'Now' : <Moment format="DD/MM/YYYY">{exp.to}</Moment>}
                                </p>
                                <p><strong>Position: </strong>{exp.title}</p>
                                <p>
                                {exp.description && (<span><strong>Description: </strong> {exp.description}</span>)}
                                </p>
                            </div>
                        ))}
                    </Fragment>)
                    : (<Fragment>
                        <h4>No experience credentials</h4>
                        {auth.isAuthenticated && auth.loading===false && auth.user._id===profile.user._id && (
                            <Link to="/add-experience">
                                <BsPlusCircleFill size="25px" style={{float: 'right', marginTop: '-5rem'}} />
                            </Link>
                        )}
                    </Fragment>)
                }
            </div>
            {/* Education */}
            <div class="profile-edu bg-white p-2">
                <h2 class="text-primary">Education</h2>
                {profile.education.length>0
                    ? (<Fragment>
                        {profile.education.map(edu=>(
                            <div key={edu._id}>
                                <h3 class="text-dark">{edu.school}</h3>
                                <p>
                                    <Moment format="DD/MM/YYYY">{edu.from}</Moment> - {!edu.to ? 'Now' : <Moment format="DD/MM/YYYY">{edu.to}</Moment>}
                                </p>
                                <p><strong>Degree: </strong>{edu.degree}</p>
                                <p><strong>Field of Study: </strong>{edu.fieldOfStudy}</p>
                                <p>
                                <strong>Description: </strong> {edu.description}
                                </p>
                            </div>
                        ))}
                        
                    </Fragment>)
                    : (
                        <Fragment>
                           <h4>No education credentials</h4>
                           {auth.isAuthenticated && auth.loading===false && auth.user._id===profile.user._id && (
                               <Link to="/add-education">
                                    <BsPlusCircleFill size="25px" style={{float: 'right', marginTop: '-5rem'}} />
                                </Link>
                           )}   
                        </Fragment>
                    )
                }
            </div>            
            {/* Github repos */}
            {repos.length>0 && (
                <div class="profile-github">
                <h2 class="text-primary my-1">
                    <FaGithub /> Github Repos
                </h2>
                {repos===null
                    ? <Spin style={{marginLeft: '49%', marginTop: '1rem'}} indicator={antIcon} size="large" />
                    : (<Fragment>
                        {repos.map(repo=>(
                            <div class="repo bg-white p-1 my-1" key={repo._id}>
                                <div>
                                <h4><a href={repo.html_url} target="_blank"
                                    rel="noopener noreferrer">{repo.name}</a></h4>
                                <p>{repo.description}</p>
                                </div>
                                <div>
                                <ul>
                                    <li class="badge badge-primary">Stars: {repo.stargazers_count}</li>
                                    <li class="badge badge-dark">Watchers: {repo.watchers_count}</li>
                                    <li class="badge badge-light">Forks: {repo.forks_count}</li>
                                </ul>
                                </div>
                            </div>
                        ))}
                    </Fragment>
                    )
                }
            </div>
            )}
        </Fragment>
    )
}

const mapStateToProps=state=>{
    return{
        auth: state.auth,
        repos: state.profile.repos
    }
}

export default connect(mapStateToProps, {getGithubRepos})(Profile)