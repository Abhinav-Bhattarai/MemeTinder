import React, { Fragment } from 'react'

const MainPageGuard = (props) => {

    let jsx = null
    if(props.auth_status){
        if(props.auth_status){
            jsx = props.children
        }
    }
    return (
        <Fragment>
            {jsx}
        </Fragment>
    )
}

export default MainPageGuard
