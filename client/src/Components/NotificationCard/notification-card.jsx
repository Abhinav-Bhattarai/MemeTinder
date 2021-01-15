import React, { Fragment } from 'react';
import './notification-card.scss';

const NotificationCard = ({ sender, profile }) => {
    console.log(sender, profile);
    return (
        <Fragment>
            <main className='notification-card-container'>
                <img src = { profile } alt='sender-profile'/>
                <div>
                    <header>{ sender }</header>
                    <footer> has accepted your match request </footer>
                </div>
            </main>
        </Fragment>
    )
}

export default NotificationCard;
