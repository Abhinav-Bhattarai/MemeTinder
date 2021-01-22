import React, { Fragment, useState } from 'react';
import './messages.scss';
import Message from './MessageContainer/Message/message';
import MessageFooter from './MessageFooter/message-footer';
import MessageHeader from './MessageHeader/message-header';
import MessageContainer from './MessageContainer/message-container';
import VideoContainer from './VideoContainer/video-container';

const Messages = ({ ChangeMessageInput, MessageInputValue, RecentMessages, Profile, Username, blur, SendMessage }) => {

    const [ video_call_popup, SetVideoCallPopup ] = useState(false);
    console.log(video_call_popup)
    let jsx = null;
    if( RecentMessages && Profile && Username ){
        jsx = (
            <>
                <MessageHeader
                    Username = { Username }
                    ProfilePicture = { Profile }
                    TriggerPhoneCall = { ()=> SetVideoCallPopup(!video_call_popup) }
                />

                <MessageContainer>
                    {
                        ( RecentMessages.length >= 1 ) ? (
                            RecentMessages.map((messages, i)=>{
                                return (
                                    <Message 
                                        key = { i }
                                        Message = { messages.data } 
                                        Self = { messages.self }
                                        Date = { messages.Date }
                                    />
                                )
                            })
                        ): null
                    }
                </MessageContainer>
    
                <MessageFooter
                    MessageInputValue = { MessageInputValue }
                    MessageInputChanger = { ChangeMessageInput }
                    SendMessage = { ()=>SendMessage(Username) }
                />
            </>
        )
    };

    return (
        <Fragment>
            <main className = 'main-messages-container' 
                style = { 
                          { 
                            filter: `blur(${blur})`,
                          } 
                        }
            >
                { jsx }
            </main>
            {
                (video_call_popup === true) ? (
                    <VideoContainer>
                        
                    </VideoContainer>
                ): null
            }
        </Fragment>
    )
}

export default Messages;
