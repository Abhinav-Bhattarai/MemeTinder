import React, { Fragment } from 'react';
import '../../SiderBar/SideBar-Header/sidebar-header.scss';

const RequestHeader = () => {
    return (
        <Fragment>
            <header className='sidebar-header' style= {{ justifyContent: 'center', padding: '17px 5%' }}>
                <div className='sidebar-header-name'>
                    Requests
                </div>
            </header>
        </Fragment>
    )
}

export default RequestHeader
