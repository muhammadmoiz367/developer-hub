import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {FaUserAlt} from 'react-icons/fa'
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'

import {setAlert} from '../redux/actions/alert'
import {signUp} from '../redux/actions/auth'
import { Button } from 'antd';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      width: theme.spacing(52),
      height: theme.spacing(67),
    },
    
    marginLeft: '28% !important',
    borderRadius: '25px'
  },
}));

function SignUp(props) {
    const classes = useStyles();
    const [formData, setFormData]=useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const {name, email, password, confirmPassword}=formData
    const onChangeHandler=e=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler=async e=>{
        e.preventDefault();
        if(password !== confirmPassword){
            props.setAlert('Password did not match', 'danger', 3000)
        }
        else{
            console.log(formData)
            props.signUp({ name, email, password })
        }
    }

    if(props.isAuthenticated){
        return <Redirect to="/dashboard" />
    }
    return (
        <div className={classes.root}>
            <Paper elevation={4}>
            <h1 className="large text-primary" style={{textAlign: 'center', paddingTop: '1.5rem'}}>Sign Up</h1>
            <p className="lead" style={{marginLeft: '20%'}}><FaUserAlt style={{verticalAlign: 'middle'}} /> Create Your Account</p>
            <form className="form" onSubmit={e=>onSubmitHandler(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={(e)=>onChangeHandler(e)} />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e)=>onChangeHandler(e)} />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password} 
                        onChange={(e)=>onChangeHandler(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword} 
                        onChange={(e)=>onChangeHandler(e)}
                    />
                </div>
                <Button htmlType="submit" type="primary" shape="round" size="large" >
                    Sign up
                </Button>
            </form>
            <p className="m-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
            </Paper>
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { setAlert, signUp })(SignUp);
