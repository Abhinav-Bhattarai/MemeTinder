import React, { Fragment } from 'react';
import './more-desc-card.scss';

const MoreDescCard = ({ profile, username }) => {
    return (

        <Fragment>
            <main className = 'desc-card'>
                <div className='pointer'></div>
                <img src = { profile } alt='desc-profile'/>
                <div style={ { 
                    fontWeight: '700',
                    fontSize: '26px',
                    letterSpacing: '1px',
                    marginTop: '21px'
                 } }>{ username }</div>
            </main>
        </Fragment>
        
    )
}

export default MoreDescCard;
