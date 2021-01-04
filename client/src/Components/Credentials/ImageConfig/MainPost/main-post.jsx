import React, { Fragment } from 'react';
import './main-post.scss';
import DefaultPost from '../../../../assets/bg.jpg';

const MainPost = ({ TriggerMainPost, main_post, SubmitPost }) => {
    return (
        <Fragment>
            <form onSubmit={ SubmitPost } className='main-post-form'>
                <img src={ (main_post) ? main_post : DefaultPost } alt='profile-pic-default' className='main-post-image'/>
                <div className='change-image' onClick={ TriggerMainPost }>Browse MainPost</div>
                <button className='main-post-submit-btn'>Submit</button>
            </form>
        </Fragment>
    )
}

export default MainPost;
