import React, { Fragment } from 'react';
import './no-data.scss';

const Nodata = ({ type }) => {
    return (
        <Fragment>
            <div className='no-data'>
                {
                    ( type === 'Notification' ) ? <div className='no-data-box no-data-circle'></div> : <div className='no-data-box'></div>
                }
                <div className='no-data-remarks'> { `No ${type} found` } </div>
            </div>
        </Fragment>
    )
}

export default Nodata
