import React, { Fragment, useRef } from 'react';
import './sidebar-nav.scss';

const SidebarNav = ({ TriggerMessageNav, TriggerMatchNav }) => {

    const navbar_pointer = useRef(null)

    return (
        <Fragment>
            <nav className='sidebar-nav'>

                <div className='sidebar-nav-element' onClick={TriggerMatchNav.bind(this,  navbar_pointer.current) }>
                    Matches
                </div>

                <div className='sidebar-nav-element' onClick={TriggerMessageNav.bind(this, navbar_pointer.current) }>
                    Messages
                </div>

                <div className='navbar-pointer' ref={ navbar_pointer }></div>

            </nav>
        </Fragment>
    )
}

export default SidebarNav;
