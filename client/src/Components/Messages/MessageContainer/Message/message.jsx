import React, { Fragment } from 'react';
import '../message-container.scss';

const Message = ({ Message, Self, Date }) => {
    return (
        <Fragment>
            <main className='message-text-container'>
                <span className={ (Self) ? 'message-me' : 'message-sender' }>
                    { Message }
                </span>
            </main>
        </Fragment>
    )
}

export default Message;
