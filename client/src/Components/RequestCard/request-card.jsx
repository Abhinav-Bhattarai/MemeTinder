import React, { Fragment, useState } from 'react';
import MoreDescCard from '../MoreDescriptionCard/more-desc-card';
import './request-card.scss';

const RequestCard = ({ sender, profile_picture, AcceptRequest, DeclineRequest }) => {

    const [ more_desc_popup, SetMoreDescPopup ] = useState( false );

    return (
        <Fragment>
            <main className='request-card'>
                
                { ( more_desc_popup ) ? (
                    <MoreDescCard
                        profile = { profile_picture }
                        username = { sender }
                    />
                ) : null }

                <header>
                    <img 
                        src={ profile_picture }
                        draggable='false'
                        alt='default-req-card'
                        onMouseOver = { ()=> SetMoreDescPopup( true ) }
                        onMouseLeave = { ()=> SetMoreDescPopup( false ) }

                    />
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
