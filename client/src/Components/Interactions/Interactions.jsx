import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import { FaHeart, FaThumbsUp, FaTimesCircle } from 'react-icons/fa';
import './Interactions.scss';

const LeftSwipe = ()=>{

    return (
        <IconContext.Provider value={{ className: 'icons left' }}>
            <FaTimesCircle/>
        </IconContext.Provider>
    )
}

const SuperLike = ()=>{

    return (
        <IconContext.Provider value={{ className: 'icons center' }}>
            <FaHeart/>
        </IconContext.Provider>
    )
}

const RightSwipe = ()=>{

    return (
        <IconContext.Provider value={{ className: 'icons right' }}>
            <FaThumbsUp/>
        </IconContext.Provider>
    )
}

const Interactions = ({ LeftClick, CenterClick, RightClick }) => {
    return (
        <Fragment>
            <main className='icon-container'>

                    <div onClick={ LeftClick }>
                        <LeftSwipe/>
                    </div>                   
                    <div onClick={ CenterClick }>
                        <SuperLike/>
                    </div>
                    <div onClick={ RightClick }>
                        <RightSwipe/>
                    </div>
                
            </main>
        </Fragment>
    )
}

export default Interactions;
