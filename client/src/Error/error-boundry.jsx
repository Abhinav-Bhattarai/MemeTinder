import React, { Component, Fragment } from 'react';
import axios from 'axios';
import ErrorPage from '../Components/UI/ErrorPage/error-page';

class ErrorBoundry extends Component {

    state = { error: false }

    componentDidCatch(err){
        this.setState({ error: true })
        axios.post(`/crash-notification/${localStorage.getItem('Username')}`, {fault: err});
    };

    render() {
        return (
            <Fragment>
                {
                    ( this.state.error ) ? <ErrorPage/> : this.props.children
                }
            </Fragment>
        );
    }
}

export default ErrorBoundry;
