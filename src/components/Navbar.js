import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import NavbarRight from './NavbarRight';
import NavbarRightAuthed from './NavbarRightAuthed';
import TagSearch from './tags/TagSearch';

export class Navbar extends Component {

    render() {
        let right = <NavbarRight />;
        if (this.props.authedUser) {
            right = <NavbarRightAuthed />;
        }
        return (
            <Menu>
                <Menu.Item header>
                    <Link to='/'>
                        TriCiti.es
                    </Link>
                </Menu.Item>
                <TagSearch />
                {right}
            </Menu>
        )
    }
}

Navbar.propTypes = {
    authedUser: PropTypes.string,
}

function mapStateToProps ({ authedUser }) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(Navbar);