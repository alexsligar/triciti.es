import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon, Button } from 'semantic-ui-react';
import { handleLogoutUser } from '../actions/authUser';

export class NavbarRightAuthed extends Component {

    render() {

        return (
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Link to='/items/add'>
                        <Icon name='pencil' />
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/lists/add'>
                        <Icon name='list' />
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/settings'>
                        <Icon name='setting' />
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to={'/users/' + this.props.authedUser}>
                        <Icon name='user' />
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={this.props.handleLogoutUser}>
                        Logout
                    </Button>
                </Menu.Item>
            </Menu.Menu>
        );
    }
}

NavbarRightAuthed.propTypes = {
    authedUser: PropTypes.string.isRequired,
    handleLogoutUser: PropTypes.func.isRequired,
}

function mapStateToProps ({ authedUser }) {
    return {
        authedUser,
    }
}

const mapDispatchToProps = { handleLogoutUser };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarRightAuthed));
