import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon, Button } from 'semantic-ui-react';
import ListModal from '../lists/ListModal';
import { handleLogoutUser } from '../../actions/authUser';
import StarredItemsModal from './StarredItemsModal';

export class NavbarRightAuthed extends Component {
  render() {
    return (
      <Menu.Menu position='right'>
        <Menu.Item>
          <StarredItemsModal />
        </Menu.Item>
        <Menu.Item>
          <Link to='/items/add'>
            <Icon name='pencil' />
          </Link>
        </Menu.Item>
        <Menu.Item>
          <ListModal />
        </Menu.Item>
        <Menu.Item>
          <Link to='/settings'>
            <Icon name='setting' />
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={'/users/' + this.props.authedUser.username}>
            <Icon name='user' />
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Button onClick={this.props.handleLogoutUser}>Logout</Button>
        </Menu.Item>
      </Menu.Menu>
    );
  }
}

NavbarRightAuthed.propTypes = {
  authedUser: PropTypes.object.isRequired,
  handleLogoutUser: PropTypes.func.isRequired,
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser.user,
  };
}

const mapDispatchToProps = { handleLogoutUser };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavbarRightAuthed)
);
