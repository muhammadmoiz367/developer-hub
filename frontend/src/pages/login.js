import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {FaUserCircle} from 'react-icons/fa'
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: theme.spacing(50),
      height: theme.spacing(60),
    },
    marginTop: '8rem',
    marginLeft: '20rem',
    borderRadius: '25px'
  },
}));

function Login() {
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
        console.log(formData)
    }
    return (
        <div className={classes.root}>
            <Paper elevation={3}>
            <h1 className="large text-primary" style={{textAlign: 'center', paddingTop: '2rem'}} >Sign In</h1>
                 <p className="lead" style={{textAlign: 'center'}}><FaUserCircle style={{verticalAlign: 'middle'}} /> Sign into Your Account</p>
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
                     <input type="submit" className="btn btn-primary" value="Login" />
                 </form>
                 <p className="m-2">
                     Don't have an account? <Link to="/signup">Sign Up</Link>
                 </p>
            </Paper>
        </div>
        // <Fragment>
        //     <div className="container">   
        //         <div className="alert alert-danger">
        //             Invalid credentials
        //         </div>
        //     </div>
        // </Fragment>
    )
}

export default Login
