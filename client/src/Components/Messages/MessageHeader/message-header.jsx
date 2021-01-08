import React, { Fragment } from 'react';
import './message-header.scss';

const MessageHeader = ({ Username, ProfilePicture }) => {
    return (
        <Fragment>
            <header className='message-header'>
                <img src= { ProfilePicture } alt= ' profile '/>
                <div> { Username } </div>
            </header>
        </Fragment>
    )
}

export default MessageHeader;
