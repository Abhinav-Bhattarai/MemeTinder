import React, { Fragment } from 'react';
import './incoming-call-page.scss';

const IncomingCallPage = ({ CallerName, CallerProfile, DeclineRequest, AcceptRequest }) => {
    return (
        <Fragment>
            <main className='incoming-call-container'>
                <img
                    src={ CallerProfile }
                    alt='caller-profile'
                />
                <div className='caller-name'>{ CallerName }</div>
            </main>
        </Fragment>
    )
}

export default IncomingCallPage;
