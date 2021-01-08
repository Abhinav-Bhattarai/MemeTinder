import React, { Fragment } from 'react';
import './people-list-card.scss';

const PeopleListCard = ({ profile_picture, username, lastupdate, click }) => {

    return (
        <Fragment>
            <main className='people-list-card-container' onClick={ ( click ) ? click : null }>
                <img src={ profile_picture } draggable='false' alt='profile-pic'/>
                <div className='people-list-card-container-desc-area'>
                    <header>{ username }</header>
                    <footer>LastUpdatedAt: { lastupdate }</footer>
                </div>
            </main>
        </Fragment>
    )

}

export default PeopleListCard
