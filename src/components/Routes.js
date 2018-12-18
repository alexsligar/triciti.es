import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Homepage from './Homepage';
import Register from './users/Register';
import Login from './Login';
import Tags from './tags/Tags';

export class Routes extends Component {
  render() {
    let routes = (
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/tags/:tag?' component={Tags} />
      </Switch>
    );
    if (this.props.authedUser) {
      routes = (
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/login' render={() => (<Redirect to='/' />)} />
          <Route path='/register' render={() => (<Redirect to='/' />)} />
          <Route path='/tags/:tag?' component={Tags} />
        </Switch>
      )
    }

    return (
      <Fragment>
        {routes}
      </Fragment>
    );
  }
}

Routes.propTypes = {
  authedUser: PropTypes.string,
};

const mapStateToProps = ({ authedUser }) => {
  return { authedUser }
}

export default withRouter(connect(mapStateToProps)(Routes));