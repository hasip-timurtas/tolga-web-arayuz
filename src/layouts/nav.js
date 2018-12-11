import React from 'react';
import { Link  } from 'react-router-dom';

const Nav = () => 
<nav className="sidebar-nav">
    <ul className="nav">
        <li className="nav-item">
            <Link className="nav-link" to={"/amni-stok"}><i className="nav-icon fa fa-shopping-cart fa-3x" /> Amni Stok</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to={"/tolga-stok"}><i className="nav-icon fa fa-shopping-cart fa-3x" /> Tolga Stok</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to={"/saw-stok"}><i className="nav-icon fa fa-shopping-cart fa-3x" /> Saw Türkiye Stok</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to={"/logout"}>
            <i className="nav-icon fa fa-sign-out fa-3x"/>Logout</Link>
        </li>
    </ul>
</nav>

export default Nav