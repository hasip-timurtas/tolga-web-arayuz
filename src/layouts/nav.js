import React from 'react';
import { Link  } from 'react-router-dom';

const Nav = () => 
<nav className="sidebar-nav">
    <ul className="nav">
        <li className="nav-item">
            <Link className="nav-link" to={"/dash"}>
                <i className="nav-icon icon-speedometer" /> Dashboard
            </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to={"/buy-sell"}>
            <i className="nav-icon fa fa-buysellads fa-lg" /> Buy Sell</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to={"/altcoin-buy-sell"}>
            <i className="nav-icon fa fa-buysellads fa-lg" /> Altcoin Buy Sell</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to={"/"}>
            <i className="nav-icon fa fa-buysellads fa-lg" /> Notes</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to={"/terminals"}>
            <i className="nav-icon fa fa-buysellads fa-lg" /> Terminals</Link>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/panel">
            <i className="nav-icon icon-puzzle" /> Panel</a>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to={"/logout"}>
            <i className="nav-icon fa fa-buysellads fa-lg" />Logout</Link>
        </li>
    </ul>
</nav>

export default Nav