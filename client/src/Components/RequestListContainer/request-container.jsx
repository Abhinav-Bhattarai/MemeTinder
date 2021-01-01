import React, { Fragment } from 'react';
import './request-container.scss';

const RequestContainer = ({ children }) => {
    return (
        <Fragment>
            <main className='request-container'>
                { children }
            </main>
        </Fragment>
    )
}

export default RequestContainer;
