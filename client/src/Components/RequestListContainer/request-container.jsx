import React, { Fragment } from 'react';
import './request-container.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const RequestContainer = ({ children }) => {
    return (
        <Fragment>
            <SimpleBar style={{ maxHeight: '79%', scrollbarWidth: '2%' }}>
                <main className='request-container'>
                    { children }
                </main>
            </SimpleBar>
        </Fragment>
    )
}

export default RequestContainer;
