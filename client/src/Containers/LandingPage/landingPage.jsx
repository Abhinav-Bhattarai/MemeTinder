import React, { Fragment } from 'react';
import Background from '../../assets/bg.jpg';
import Navbar from '../../Components/Navbar/LandiingPage/navbar';
import Logo from '../../Components/UI/Logo/logo';

import './landingPage.scss';

const LandingPage = () => {
    return (
        <Fragment>
            <main>
                <Navbar/>
                <main className='background-image-container' style={{height: '100%'}}>
                    <img src={Background} alt='background'/>
                </main>
                <main className='landingpage-middle-flex'>
                    <Logo type='LandingPage'/>
                    <button id='middle-flex-btn'>CREATE ACCOUNT</button>
                </main>
            </main>
        </Fragment>
    )
}

export default LandingPage
