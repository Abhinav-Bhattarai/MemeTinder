import React, { Fragment } from 'react';
import Logo from '../Logo/logo';
import Spinner from '../Spinner/spinner';
import './logo-page.scss';

// E-COMMERCE LOGO and Name like that of native apps
const LogoPage = () => {
    return (
        <Fragment>
            <div className='logo-page-container'>
                <Logo/>
                <Spinner/>
            </div>
        </Fragment>
    )
}

export default LogoPage