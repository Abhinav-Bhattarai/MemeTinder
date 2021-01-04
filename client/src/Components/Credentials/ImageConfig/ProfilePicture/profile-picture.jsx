import React, { Fragment } from 'react';
import '../MainPost/main-post.scss';
import DefaultUser from '../../../../assets/default-user.png';

const ProfilePicture = ({ TriggerProfile, ProfilePicture, Submit }) => {
    return (
       <Fragment>
           <img src={ (ProfilePicture) ? ProfilePicture : DefaultUser } alt='profile-pic-default' className='profile-image'/>
           <div className='change-image' onClick={ TriggerProfile }>Browse ProfilePicture</div>
           <div className='profile-continue' onClick={ Submit }>Continue</div>
       </Fragment>
    )
}

export default ProfilePicture;
