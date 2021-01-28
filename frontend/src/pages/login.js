import React, { useState } from 'react'
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {FaUserAlt} from 'react-icons/fa'
import { Link, Redirect } from 'react-router-dom';

import {logIn} from '../redux/actions/auth'
import { Button } from 'antd';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: theme.spacing(50),
      height: theme.spacing(55),
    },
    marginTop: '2rem',
    marginLeft: '30% !important',
    borderRadius: '25px'
  },
}));

function Login(props) {
    const classes = useStyles();
    const [formData, setFormData]=useState({
        email: '',
        password: ''
    })

    const {email, password}=formData
    const onChangeHandler=e=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandler=e=>{    
        e.preventDefault()
        props.logIn(email, password)
    }
    if(props.isAuthenticated){
        return <Redirect to="/dashboard" />
    }
    return (
        <>
        <div className={classes.root}>
            <Paper elevation={3}>
            <h1 className="large text-primary" style={{textAlign: 'center', paddingTop: '2rem'}} >Sign In</h1>
                 <p className="lead" style={{marginLeft: '15%'}}><FaUserAlt style={{verticalAlign: 'middle'}} /> Sign into Your Account</p>
                 <br/>
                 <form className="form" onSubmit={e=>onSubmitHandler(e)}>
                     <div className="form-group">
                     <input
                         type="email"
                         placeholder="Email Address"
                         name="email"
                         value={email}
                         onChange={e=>onChangeHandler(e)}
                         required
                     />
                     </div>
                     <div className="form-group">
                     <input
                         type="password"
                         placeholder="Password"
                         name="password"
                         value={password}
                         onChange={e=>onChangeHandler(e)}
                     />
                     </div>
                     <Button htmlType="submit" type="primary" shape="round" size="large" >
                        Login
                    </Button>
                 </form>
                 <p className="m-2">
                     Don't have an account? <Link to="/signup">Sign Up</Link>
                 </p>
            </Paper>
        </div>
        </>
    )
}

const mapStateToProps=state=>{
    return{
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { logIn })(Login);
