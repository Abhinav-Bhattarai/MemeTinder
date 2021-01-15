import React, { Component, Fragment } from 'react';
import ErrorPage from '../Components/UI/ErrorPage/error-page';

class ErrorBoundry extends Component {

    state = { error: false }

    componentDidCatch(){
        this.setState({ error: true })
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
