import React from 'react';
import { Link } from 'react-router-dom';
import {BiCodeAlt} from 'react-icons/bi'

export default function NavBar() {

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><BiCodeAlt size="1.5em" style={{verticalAlign: 'middle'}} /> DevelopersHub</Link>
      </h1>
      <ul>
        <li><Link to="#">Developers</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}