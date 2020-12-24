import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import MainRouter from './Containers/MainRouter/mainRouter';

function App() {
    return (
      <Fragment>
          <Router>
              <MainRouter/>
          </Router>
      </Fragment>
    )
}

export default App;