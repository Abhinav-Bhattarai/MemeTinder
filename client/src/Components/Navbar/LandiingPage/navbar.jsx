import React, { Fragment } from 'react';
import './navbar.scss';

const Navbar = (props) => {
    return (
        <Fragment>
            <nav className='navbar-container'>
                <div className='navbar-container-logo'>MemeDer</div>
                <div className='login-btn' onClick={props.TriggerLogin}>LOGIN</div>
            </nav>
        </Fragment>
    )
}

export default Navbar;
