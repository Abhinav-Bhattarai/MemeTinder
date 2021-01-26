import React, { Component, Fragment } from "react";
import axios from "axios";
import ErrorPage from "../Components/UI/ErrorPage/error-page";

class ErrorBoundry extends Component {
  state = { error: false };

  componentDidCatch(err) {
    axios.post(`/crash-notification/${localStorage.getItem("Username")}`, {
      fault: err
    });
    this.setState({ error: true });
  }

  render() {
    return (
      <Fragment>
        {this.state.error ? <ErrorPage /> : this.props.children}
      </Fragment>
    );
  }
}

export default ErrorBoundry;
