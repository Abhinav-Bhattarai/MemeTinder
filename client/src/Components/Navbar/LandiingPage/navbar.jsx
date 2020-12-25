import React, { Fragment } from 'react';
import './navbar.scss';

const Navbar = () => {
    return (
        <Fragment>
            <nav className='navbar-container'>
                <div className='navbar-container-logo'>MemeDer</div>
                <div className='login-btn'>LOGIN</div>
            </nav>
        </Fragment>
    )
}

export default Navbar;
