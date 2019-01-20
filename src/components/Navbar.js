import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
import NavbarRight from './NavbarRight';
import NavbarRightAuthed from './NavbarRightAuthed';
import TagSearch from './tags/TagSearch';

export class Navbar extends Component {
  render() {
    let right = <NavbarRight />;
    if (this.props.authedUser) {
      right = <NavbarRightAuthed />;
    }
    const path = this.props.location.pathname;
    const tagSearchContent = (
      <Fragment>
        {path !== '/tags' && (
          <Menu.Item>
            <Link to='/tags'>
              <Icon name='tag' />
            </Link>
          </Menu.Item>
        )}
        {path.substring(0, 5) !== '/tags' && (
          <Menu.Item>
            <TagSearch initialValue='' />
          </Menu.Item>
        )}
      </Fragment>
    );
    return (
      <Menu>
        <Menu.Item header>
          <Link to='/'>TriCiti.es</Link>
        </Menu.Item>
        {tagSearchContent}
        {right}
      </Menu>
    );
  }
}

Navbar.propTypes = {
  authedUser: PropTypes.object,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser.user,
  };
}

export default withRouter(connect(mapStateToProps)(Navbar));
