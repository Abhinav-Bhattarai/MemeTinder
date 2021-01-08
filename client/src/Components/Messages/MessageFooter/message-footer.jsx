import React, { Fragment } from 'react';
import './message-footer.scss';

const MessageFooter = ({ MessageInputValue, MessageInputChanger }) => {
    return (
        <Fragment>
            <footer className='message-input-footer'>
                <input 
                    type = 'text' 
                    value = { MessageInputValue }
                    onChange = { MessageInputChanger }
                    placeholder = 'Enter your message .....'
                />
            </footer>
        </Fragment>
    )
}

export default MessageFooter;
