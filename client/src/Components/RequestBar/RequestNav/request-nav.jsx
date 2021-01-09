import React, { Fragment, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import '../../SiderBar/Sidebar-Nav/sidebar-nav.scss';

const RequestNav = ({ TriggerNotificationNav, TriggerRequestNav }) => {

    const navbar_pointer = useRef(null);

    return (
        <Fragment>
            <nav className='sidebar-nav'>

                <div className='sidebar-nav-element'
                    onClick={
                        TriggerRequestNav.bind(this, navbar_pointer.current)
                    }
                >
                    <NavLink to='/'> Requests </NavLink>
                </div>

                <div className='sidebar-nav-element'
                    onClick={
                        TriggerNotificationNav.bind(this, navbar_pointer.current)
                    }
                >
                    <NavLink to='/notifications'> Notification </NavLink>
                </div>

                <div className='navbar-pointer' ref={ navbar_pointer }></div>

            </nav>
        </Fragment>
    )
};

export default RequestNav;
