import React, { Fragment } from 'react';
import './people-list-container.scss';

const PeopleListContainer = ({ children }) => {
    return (
        <Fragment>
            <div className='people-list-container'>
                { children }
            </div>
        </Fragment>
    )
};

export default PeopleListContainer;
