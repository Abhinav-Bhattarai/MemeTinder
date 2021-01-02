import React, { Fragment } from 'react';
import './post-container.scss';

const PostContainer = ({ children }) => {
    return (
        <Fragment>
            <main className='main-post-container'>
                { children }
            </main>
        </Fragment>
    )
}

export default PostContainer;
