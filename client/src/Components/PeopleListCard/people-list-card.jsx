import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import { FaDotCircle } from 'react-icons/fa';
import './people-list-card.scss';

const NotifyIcon = ()=>{
    return (
        <IconContext.Provider value={{ className: 'notify-icon' }}>
            <FaDotCircle/>
        </IconContext.Provider>
    )
}

const NewIcon = ()=>{
    return (
        <div className='new-icon'>NEW</div>
    )
}

const PeopleListCard = ({ profile_picture, username, lastupdate, click, notification, recent }) => {
    return (
        <Fragment>
            <main className='people-list-card-container' onClick={ ( click ) ? click.bind(this, username) : null }>
                { (notification) ? <NotifyIcon/> : null }
                { (recent) ? <NewIcon/> : null }
                <img src={ profile_picture } draggable='false' alt='profile-pic'/>
                <div className='people-list-card-container-desc-area'>
                    <header>{ username }</header>
                    <footer>Matched_Date: { lastupdate }</footer>
                </div>
            </main>
        </Fragment>
    )
    
}

export default PeopleListCard;