import React, { Fragment, useState } from 'react';
import '../message-container.scss';

const Message = ({ Message, Self, Date }) => {

    const [ showDate, SetShowDate ] = useState( false );

    return (
        <Fragment>
            <main className='message-text-container'>
                <span className={ (Self) ? 'message-me' : 'message-sender' } onClick={ 
                    ()=> SetShowDate( !showDate )
                 }>
                    { Message }
                    {
                    ( showDate ) ? <div className='message-date'>{ Date }</div> : null
                    }
                </span>
            </main>
        </Fragment>
    )
}

export default Message;
