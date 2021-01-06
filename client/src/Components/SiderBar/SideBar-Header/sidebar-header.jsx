import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import { FaPowerOff } from 'react-icons/fa'

import './sidebar-header.scss';

export const Icon = ()=>{
    return (
        <IconContext.Provider value={{
            style: {
                border: '1px solid #fff',
                borderRadius: '50%',
                fontSize: '20px',
                padding: '8px 8px',
                color: '#fff'
            }
        }}>
            <FaPowerOff/>
        </IconContext.Provider>
    )
}

const SidebarHeader = ({ profile_picture, TriggerDropdown, children }) => {
    return (
        <Fragment>
            <header className='sidebar-header'>
                {
                    (profile_picture) ? 
                        <img 
                            draggable='false'
                            src={ profile_picture } 
                            alt=' profile '
                            onMouseOver={ TriggerDropdown }
                        /> : 
                        <div className='temp-img'></div>
                }

                <div className='sidebar-header-name'>
                    My Profile
                </div>

                <Icon/>

                { children }

            </header>
        </Fragment>
    )
}

export default SidebarHeader
