import React, { Fragment } from 'react';
import './error-page.scss';
import ErrorImage from '../../../assets/default-post.svg';

const ErrorPage = () => {
    return (
        <Fragment>
            <main className='error-page'>
                <img src = { ErrorImage } alt='error'/>
            </main>
        </Fragment>
    )
}

export default ErrorPage;
