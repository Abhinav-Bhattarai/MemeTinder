import React, { Fragment, useRef } from 'react';
import './sidebar-nav.scss';
import { IconContext } from 'react-icons';
import { FaDotCircle } from 'react-icons/fa';

export const NotifyIcon = ()=>{
    return (
        <IconContext.Provider value={{ className: 'notify-icon-2' }}>
            <FaDotCircle/>
        </IconContext.Provider>
    )
}


const SidebarNav = ({ TriggerMessageNav, TriggerMatchNav, NavNotification }) => {

    const navbar_pointer = useRef(null)

    return (
        <Fragment>
            <nav className='sidebar-nav'>

                <div className='sidebar-nav-element' onClick={TriggerMatchNav.bind(this,  navbar_pointer.current) }>
                    Matches
                </div>

                <div className='sidebar-nav-element' onClick={TriggerMessageNav.bind(this, navbar_pointer.current) }>
                    Messages
                    { (NavNotification) ? <NotifyIcon/> : null }
                </div>

                <div className='navbar-pointer' ref={ navbar_pointer }></div>

            </nav>
        </Fragment>
    )
}

export default SidebarNav;
