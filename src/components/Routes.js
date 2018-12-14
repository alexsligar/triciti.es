import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';


export class Routes extends Component {
  render() {
    return (
        <Switch>
            <Route exact path='/' component={Homepage} />
        </Switch>
    );
  }
}

Routes.propTypes = {
};

export default withRouter(connect()(Routes));