import React, { Fragment } from 'react';
import './request-bar.scss';

const RequestBar = ({ children, blur }) => {
    return (
        <Fragment>
            <main className='request-bar-container' style={{filter: `blur(${blur})`}}>
                { children }
            </main>
        </Fragment>
    )
}

export default RequestBar;
