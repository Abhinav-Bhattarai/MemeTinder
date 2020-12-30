import React, { Fragment } from 'react';
import './no-data.scss';

const Nodata = ({ type }) => {
    return (
        <Fragment>
            <div className='no-data'>
                <div className='no-data-box'></div>
                <div className='no-data-remarks'> {(type === 'messages')? 'No Messages Found': 'No Matches Found'} </div>
            </div>
        </Fragment>
    )
}

export default Nodata
