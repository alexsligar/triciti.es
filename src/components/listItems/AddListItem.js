import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Message, Header, Button, Icon } from 'semantic-ui-react';
import { handleGetUserLists } from '../../actions/users/getUserLists';

export class AddListItem extends Component {

    componentDidMount() {
        this.props.handleGetUserLists(this.props.authedUser);
    }

    render() {
        const { authedUser, userListsLoading, userListsError, userLists } = this.props;
        let content;
        if (userListsLoading || (userListsError === null && (userLists.username === null || userLists.username !== authedUser))) {
            content = (
                <Segment loading>
                    Loading
                </Segment>
            );
        } else if (userListsError) {
            content = (
                <Message 
                    error
                    content={userListsError}
                />
            );
        } else if (userLists.lists.length === 0) {
            content = (
                <Segment>
                    <Header icon>
                        <Icon name='list' />
                        You don&apos;t have any lists to add this item to.
                    </Header>
                    <Button primary>
                        Add a New List
                    </Button>
                </Segment>
            );
        } else {
            content = (
                <Button icon>
                    <Icon name='plus' />
                    Add to a List
                </Button>
            );
        }
        return content;
    }
}

AddListItem.propTypes = {
    authedUser: PropTypes.string.isRequired,
    userListsLoading: PropTypes.bool.isRequired,
    userListsError: PropTypes.string,
    userLists: PropTypes.shape({
        username: PropTypes.string,
        lists: PropTypes.array,
    }),
    handleGetUserLists: PropTypes.func.isRequired,
}

const mapStateToProps = ({ authedUser, users }) => {
    return {
        authedUser: authedUser.username,
        userListsLoading: users.getUserLists.loading,
        userListsError: users.getUserLists.error,
        userLists: users.userLists,
    }
}

const mapDispatchToProps = { handleGetUserLists };

export default connect(mapStateToProps, mapDispatchToProps)(AddListItem);
