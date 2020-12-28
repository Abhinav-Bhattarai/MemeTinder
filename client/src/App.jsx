import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import MainRouter from './Containers/MainRouter/mainRouter';

function App() {

    //shifing the main handler to mainRouter;
    return (
      <Fragment>
          <Router>
              <MainRouter/>
          </Router>
      </Fragment>
    )
}

export default App;