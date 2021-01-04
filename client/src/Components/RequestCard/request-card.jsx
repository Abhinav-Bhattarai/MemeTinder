import React, { Fragment } from 'react';
import './request-card.scss';

const RequestCard = ({ sender, profile_picture, AcceptRequest, DeclineRequest }) => {
    return (
        <Fragment>
            <main className='request-card'>
                <header>
                    <img src={ profile_picture } alt='default-req-card'/>
                    <main className='request-card-desc'>
                        <div className='request-card-desc-name'>{ sender }</div>
                        <footer>want's to match with you ?</footer>
                    </main>
                </header>
                <article className='request-card-reply-container'>
                    <div className='request-card-reply' onClick={(e)=>AcceptRequest(e,  profile_picture, sender ) }>ACCEPT</div>
                    <div className='request-card-reply' onClick={ (e)=>DeclineRequest(e, sender) }>DECLINE</div>
                </article>
            </main>
        </Fragment>
    )
}

export default RequestCard;
