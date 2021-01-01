import React, { Fragment } from 'react';
import './request-bar.scss';

const RequestBar = ({ children }) => {
    return (
        <Fragment>
            <main className='request-bar-container'>
                { children }
            </main>
        </Fragment>
    )
}

export default RequestBar;
