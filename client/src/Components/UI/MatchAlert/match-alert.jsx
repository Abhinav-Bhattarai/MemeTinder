import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import { FaHeart } from 'react-icons/fa';
import './match-alert.scss';

const LoveIcon = ()=>{
    return (
        <IconContext.Provider value={{ className: 'love-icon' }}>
            <FaHeart/>
        </IconContext.Provider>
    )
}

const MatchAlert = () => {
    return (
        <Fragment>
            <main className='match-alert-container'>
                <LoveIcon/>
                <div>You're a Match</div>
            </main>
        </Fragment>
    )
}

export default MatchAlert;
