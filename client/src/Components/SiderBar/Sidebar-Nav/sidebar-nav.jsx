import React, { Fragment, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar-nav.scss';

const SidebarNav = ({ TriggerMessageNav, TriggerMatchNav }) => {

    const navbar_pointer = useRef(null)

    return (
        <Fragment>
            <nav className='sidebar-nav'>

                <div className='sidebar-nav-element' onClick={ (e) => TriggerMatchNav(e, navbar_pointer.current) }>
                    <NavLink to='/'> Matches </NavLink>
                </div>

                <div className='sidebar-nav-element' onClick={ (e) => TriggerMessageNav(e, navbar_pointer.current) }>
                    <NavLink to='/login'> Messages </NavLink>
                </div>

                <div className='navbar-pointer' ref={ navbar_pointer }></div>

            </nav>
        </Fragment>
    )
}

export default SidebarNav;
