import React, { Fragment, useRef } from 'react';
import { IconContext } from 'react-icons';
import { FaDotCircle } from 'react-icons/fa';
import '../../SiderBar/Sidebar-Nav/sidebar-nav.scss';

const NotifyIcon = ()=>{
    return ()=>{
        <IconContext.Provider value={{style: {
            fontSize: '8px',
            color: '#ff385c',
            position: 'absolute',
            top: '3px',
            backgroundColor: '#ff385c',
            borderRadius: '50%',
            right: '11%',
            boxShadow: '0 0 5px $theme-color'
        }}}>
            <FaDotCircle/>
        </IconContext.Provider>
    }
}

const RequestNav = ({ TriggerNotificationNav, TriggerRequestNav, NavNotification }) => {

    const navbar_pointer = useRef(null);

    return (
        <Fragment>
            <nav className='sidebar-nav'>

                <div className='sidebar-nav-element'
                    onClick={
                        TriggerRequestNav.bind(this, navbar_pointer.current)
                    }
                >
                    Requests
                </div>

                <div className='sidebar-nav-element'
                    onClick={
                        TriggerNotificationNav.bind(this, navbar_pointer.current)
                    }
                >
                    Notification
                    { (NavNotification) ? <NotifyIcon/> : null }
                </div>

                <div className='navbar-pointer' ref={ navbar_pointer }></div>

            </nav>
        </Fragment>
    )
};

export default RequestNav;
