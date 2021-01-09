import React, { Fragment } from 'react';
import './message-container.scss';
import { IconContext } from 'react-icons';
import { FaFacebookMessenger } from 'react-icons/fa';

const NoMessage = ()=>{
    return (
        <IconContext.Provider value={{ style: {
            fontSize: '100px',
            color: '#ff385c'
        } }}>
            <FaFacebookMessenger/>
        </IconContext.Provider>
    )
}

const MessageContainer = ({ children }) => {
    return (
        <Fragment>
            <main className='message-container' style={ ( !children ) ? { 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
             } : {} }>
                { ( children ) ? children : (
                    <>
                        <NoMessage/>
                        <div 
                            style={{
                                fontWeight: '700',
                                fontSize: '22px',
                                textAlign: 'center',
                                marginTop: '20px'
                            }}
                        >
                            No Recent Messages Found !!
                        </div>
                    </>
                ) }
            </main>
        </Fragment>
    )
}

export default MessageContainer;
