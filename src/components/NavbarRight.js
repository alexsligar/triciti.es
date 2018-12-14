import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Button } from 'semantic-ui-react';

export class NavbarRight extends Component {

    render() {
        return (
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Link to='/register'>
                        <Button>
                            Sign Up
                        </Button>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/login'>
                        <Button>
                            Login
                        </Button>
                    </Link>
                </Menu.Item>
            </Menu.Menu>
        )
    }
}

NavbarRight.propTypes = {};

export default withRouter(connect()(NavbarRight));