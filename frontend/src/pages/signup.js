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
      width: theme.spacing(52),
      height: theme.spacing(70),
    },
    marginTop: '5rem',
    marginLeft: '20rem',
    borderRadius: '25px'
  },
}));

function SignUp() {
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
            console.log('Password did not match')
        }
        else{
            console.log(formData)
            // const newUser={
            //     name,
            //     email,
            //     password
            // }
            // try {
            //     const config={
            //         headers:{
            //             'Content-Type': 'application/json'
            //         }
            //     }
            //     const body=JSON.stringify(newUser)
            //     const res=await axios.post('/api/users', body, config)
            //     console.log(res.data)
            // } catch (error) {
            //     console.error(error.response.data)
            // }
        }
    }
    return (
        <div className={classes.root}>
            <Paper elevation={3}>
            <h1 className="large text-primary" style={{textAlign: 'center', paddingTop: '2rem'}}>Sign Up</h1>
            <p className="lead" style={{textAlign: 'center'}}><FaUserCircle style={{verticalAlign: 'middle'}} /> Create Your Account</p>
            <br/>
            <form className="form" onSubmit={e=>onSubmitHandler(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={(e)=>onChangeHandler(e)} required />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e)=>onChangeHandler(e)} required />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password} 
                        onChange={(e)=>onChangeHandler(e)}
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        minLength="6"
                        value={confirmPassword} 
                        onChange={(e)=>onChangeHandler(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="m-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
            </Paper>
        </div>
    )
}

export default SignUp
