import React, { Fragment } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import './people-list-container.scss';

const PeopleListContainer = ({ children }) => {
    return (
        <Fragment>
            <SimpleBar style={{ maxHeight: '79%', scrollbarWidth: '2%' }}>
                <div className='people-list-container'>
                    { children }
                </div>
            </SimpleBar>
        </Fragment>
    )
};

export default PeopleListContainer;
