import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import { FaShoppingBag } from 'react-icons/fa'

import './sidebar-header.scss';
import TestImage from '../../../assets/bg.jpg';

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
            <FaShoppingBag/>
        </IconContext.Provider>
    )
}

const SidebarHeader = () => {
    return (
        <Fragment>
            <header className='sidebar-header'>
                <img 
                    src={ TestImage } 
                    alt=' profile '
                />

                <div className='sidebar-header-name'>
                    My Profile
                </div>

                <Icon/>

            </header>
        </Fragment>
    )
}

export default SidebarHeader
