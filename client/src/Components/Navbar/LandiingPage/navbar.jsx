import React, { Fragment } from 'react';
import './navbar.scss';

const Navbar = ({ TriggerLogin, blur }) => {
    return (
        <Fragment>
            <nav className='navbar-container' style={ (blur) ? {filter: `blur(5px)`} : {} }>
                <div className='navbar-container-logo'>MemeDer</div>
                <div className='login-btn' onClick={ TriggerLogin }>LOGIN</div>
            </nav>
        </Fragment>
    )
}

export default Navbar;
