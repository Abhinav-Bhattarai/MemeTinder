import React, { Fragment } from 'react';
import './no-post.scss';
import DefaultImage from '../../../assets/default-post.svg';

const NoPost = () => {
    return (
        <Fragment>
            <main className='main-post-container main-post-container-default'>
                <img src={ DefaultImage } alt='default-post-bg'/>
                <div className='no-post-message'>
                    OOPS! Looks like there are no Posts.
                </div>
            </main>
        </Fragment>
    )
}

export default NoPost
