import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Button } from 'semantic-ui-react';

export class NavbarRight extends Component {
  render() {
    let registerButton;
    if (this.props.location.pathname !== '/register') {
      registerButton = (
        <Menu.Item>
          <Link to='/register'>
            <Button>Sign Up</Button>
          </Link>
        </Menu.Item>
      );
    }
    let loginButton;
    if (this.props.location.pathname !== '/login') {
      loginButton = (
        <Menu.Item>
          <Link to='/login'>
            <Button>Login</Button>
          </Link>
        </Menu.Item>
      );
    }
    return (
      <Menu.Menu position='right'>
        {registerButton}
        {loginButton}
      </Menu.Menu>
    );
  }
}

NavbarRight.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

export default withRouter(connect()(NavbarRight));
