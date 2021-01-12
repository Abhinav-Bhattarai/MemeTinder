import React, { Fragment, useEffect, useRef } from 'react';
import { IconContext } from 'react-icons';
import { BiSend } from 'react-icons/bi';
import './message-footer.scss';

const SendIcon = ()=>{
    return (
        <IconContext.Provider value = {{
            style: {
                fontSize: '15px',
                position: 'absolute',
                top: '50%',
                right: '3%'
            }
        }}>
            <BiSend/>
        </IconContext.Provider>
    )
}

const MessageFooter = ({ MessageInputValue, MessageInputChanger, SendMessage }) => {
    const textarea_ref = useRef( null );

    const TextAreaListener = (press)=>{
        if(press.key === 'Enter'){
            // Send Message;
            SendMessage();
        }
    }

    useEffect(()=>{
        const ref = textarea_ref.current;

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
                <span onClick = { SendMessage }> <SendIcon/> </span>
            </footer>
        </Fragment>
    )
}

export default MessageFooter;
