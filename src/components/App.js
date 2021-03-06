import React, { Fragment } from 'react';
import { Router } from 'react-router-dom';
import history from '../history';
import Routes from './routing/Routes';
import Navbar from './navbar/Navbar';

export default function App() {
  return (
    <Router history={history}>
      <Fragment>
        <Navbar />
        <Routes />
      </Fragment>
    </Router>
  );
}
