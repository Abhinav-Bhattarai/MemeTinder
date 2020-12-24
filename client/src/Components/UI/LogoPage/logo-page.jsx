import React, { Fragment } from 'react';
import Logo from '../../Logo/logo';
import Spinner from '../Spinner/spinner';
import './logo-page.scss';

// E-COMMERCE LOGO and Name like that of native apps
const LogoPage = () => {
    const view = window.innerHeight
    return (
        <Fragment>
            <div className='logo-page-container' style={{height: `${view}px`}}>
                <Logo type='logo-2'/>
                <Spinner/>
            </div>
        </Fragment>
    )
}

export default LogoPage