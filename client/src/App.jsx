import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import MainRouter from './Containers/MainRouter/mainRouter';
import ErrorBoundry from './Error/error-boundry';

function App() {

    //shifing the main handler to mainRouter;
    return (
      <Fragment>
          <ErrorBoundry>
            <Router>
                <MainRouter/>
            </Router>
          </ErrorBoundry>
      </Fragment>
    )
}

export default App;