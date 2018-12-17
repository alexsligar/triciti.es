import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import Register from './users/Register';


export class Routes extends Component {
  render() {
    return (
        <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/register' component={Register} />
        </Switch>
    );
  }
}

Routes.propTypes = {
};

export default withRouter(connect()(Routes));