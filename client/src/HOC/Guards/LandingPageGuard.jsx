import React, { Fragment } from 'react';

const LandingPageGuard = (props) => {
    let jsx = null
    if(props.auth_status === false){
        if(props.auth_status === false){
            jsx = props.children
        }
    }
    return (
        <Fragment>
            {jsx}
        </Fragment>
    )
}

export default LandingPageGuard
