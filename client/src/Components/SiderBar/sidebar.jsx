import React, { Fragment } from 'react';
import './sidebar.scss';

const SideBar = ( props ) => {
    return (
        <Fragment>
            <main className='side-bar-container'>
                { props.children }
            </main>
        </Fragment>
    )
}

export default SideBar
