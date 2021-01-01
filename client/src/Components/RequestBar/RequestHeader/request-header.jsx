import React, { Fragment } from 'react';
import '../../SiderBar/SideBar-Header/sidebar-header.scss';

const RequestHeader = () => {
    return (
        <Fragment>
            <header className='sidebar-header' style= {{ justifyContent: 'center' }}>
                <div className='sidebar-header-name'>
                    Requests
                </div>
            </header>
        </Fragment>
    )
}

export default RequestHeader
