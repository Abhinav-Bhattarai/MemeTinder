import React, { Fragment } from 'react';
import './image-container.scss';

const ImageContainer = ({ ProfilePicture, Username, MainPost }) => {
    return (
        <Fragment>  
            <main className='post-img-container'>
                <img src={ ProfilePicture } alt='post' className='Mainpost'/>
                <div className='post-desc'>
                    <img src={ MainPost } alt='profilepic'/>
                    <div className='post-desc-name' style={{color: '#fff'}}>{ Username }</div>
                </div>
            </main>
        </Fragment>
    )
};

export default ImageContainer;
