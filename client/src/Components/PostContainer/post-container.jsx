import React, { Fragment } from 'react';
import './post-container.scss';

const PostContainer = ({ children, blur }) => {
    return (
        <Fragment>
            <main className='main-post-container' style={{filter: `blur(${blur})`}}>
                { children }
            </main>
        </Fragment>
    )
}

export default PostContainer;
