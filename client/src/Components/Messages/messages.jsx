import React, { Fragment } from 'react';
import '../PostContainer/post-container.scss';
import Message from './MessageContainer/Message/message';
import MessageFooter from './MessageFooter/message-footer';
import MessageHeader from './MessageHeader/message-header';

const MessageContainer = ({ ChangeMessageInput, MessageInputValue, RecentMessages, Profile, Username, blur }) => {

    let jsx = null;

    if( RecentMessages && Profile && Username ){
        jsx = (
            <>
                <MessageHeader
                    Username = { Username }
                    ProfilePicture = { Profile }
                />

                <MessageContainer>
                    {
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
                    }
                </MessageContainer>

                <MessageFooter
                    MessageInputValue = { MessageInputValue }
                    MessageInputChanger = { ChangeMessageInput }
                />
            </>
        )
    };

    return (
        <Fragment>
            <main className = 'main-post-container' style={ { filter: `blur(${blur})` } }>
                { jsx }
            </main>
        </Fragment>
    )
}

export default MessageContainer;
