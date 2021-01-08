import React, { Fragment } from 'react';
import './message-container.scss';

const MessageContainer = ({ children }) => {
    return (
        <Fragment>
            <main className='message-container'>
                { children }
            </main>
        </Fragment>
    )
}

export default MessageContainer;
