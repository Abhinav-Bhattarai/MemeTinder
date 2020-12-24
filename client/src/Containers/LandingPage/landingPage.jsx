import React, { Fragment } from 'react';
import Background from '../../assets/bg.jpg';

import './landingPage.scss';

const LandingPage = () => {
    return (
        <Fragment>
            <main>
                <main className='background-image-container' style={{height: '100%'}}>
                    <img src={Background} alt='background'/>
                </main>
            </main>
        </Fragment>
    )
}

export default LandingPage
