import React, { Fragment } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {BiLogOut, BiCodeAlt} from 'react-icons/bi'
import {FaUserAlt} from 'react-icons/fa'

import {signOut} from '../redux/actions/auth'

const NavBar=({ auth: { isAuthenticated, loading, user}, signOut})=>{

  const authLinks=(
    <ul>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
        <li>
            <Link to="/dashboard">
                <FaUserAlt />{' '}
                <span className="hide-sm">Dashboard</span>
            </Link>
        </li>
        <li>
            <a onClick={signOut} href="#">
                <BiLogOut style={{}} />{' '}
                <span className="hide-sm">Logout</span>
            </a>
        </li>
    </ul>
  )

  const guestLinks=(
    <ul>
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/login">Login</Link></li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><BiCodeAlt size="1.5em" style={{verticalAlign: 'middle'}} /> DevelopersHub</Link>
      </h1>
      {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
    </nav>
  );
}

const mapStateToProps=state=>{
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps, { signOut })(NavBar)