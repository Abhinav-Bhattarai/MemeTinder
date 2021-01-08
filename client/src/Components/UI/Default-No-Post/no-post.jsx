import React, { Fragment } from 'react';
import './no-post.scss';
import DefaultImage from '../../../assets/default-post.svg';

const NoPost = ({ blur }) => {
    return (
        <Fragment>
            <main className='main-post-container main-post-container-default' style={{
                filter: `blur(${blur})`
            }}>
                <img src={ DefaultImage } draggable='false' alt='default-post-bg'/>
                <div className='no-post-message'>
                    OOPS! Looks like there are no Posts.
                </div>
            </main>
        </Fragment>
    )
}

export default NoPost
