import React, { Fragment, useEffect, useRef } from 'react';
import './message-footer.scss';

const MessageFooter = ({ MessageInputValue, MessageInputChanger, SendMessage }) => {
    const textarea_ref = useRef( null );

    const TextAreaListener = (press)=>{
        if(press.key === 'Enter'){
            // Send Message;
            SendMessage();
        }
    }

    useEffect(()=>{
        const ref = textarea_ref.current

        if(textarea_ref.current){
            ref.addEventListener('keydown', TextAreaListener);
        }

        return ()=> {
            ref.removeEventListener('keydown', TextAreaListener);
        }

    })

    return (
        <Fragment>
            <footer className='message-input-footer'>
                <input 
                    autoFocus
                    ref = { textarea_ref }
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
