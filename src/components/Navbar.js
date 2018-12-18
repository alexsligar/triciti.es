import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
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
        let tagSearchContent;
        const path = this.props.location.pathname;
        if (path.substring(0,5) !== '/tags') {
            tagSearchContent = (<Menu.Item><TagSearch initialValue='' /></Menu.Item>);
        }
        return (
            <Menu>
                <Menu.Item header>
                    <Link to='/'>
                        TriCiti.es
                    </Link>
                </Menu.Item>
                {tagSearchContent}
                {right}
            </Menu>
        )
    }
}

Navbar.propTypes = {
    authedUser: PropTypes.string,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    })
}

function mapStateToProps ({ authedUser }) {
    return {
        authedUser,
    }
}

export default withRouter(connect(mapStateToProps)(Navbar));