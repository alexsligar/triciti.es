import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { handleGetUserLists } from '../../actions/users/getUserLists';
import AddListItemModal from './AddListItemModal';
import { showNewListModal } from '../../actions/lists/addList';

export class AddListItem extends Component {
  componentDidMount() {
    this.props.handleGetUserLists(this.props.authedUser);
  }

  render() {
    const {
      authedUser,
      userListsLoading,
      userListsError,
      userLists,
    } = this.props;
    let content;
    if (
      userListsLoading ||
      (userListsError === null &&
        (userLists.username === null || userLists.username !== authedUser))
    ) {
      content = <Button loading>Loading</Button>;
    } else if (userListsError) {
      content = <Button color='red' disabled content={userListsError} />;
    } else if (userLists.lists.length === 0) {
      content = (
        <Button color='black' icon onClick={this.props.showNewListModal}>
          <Icon name='plus' />
          No Lists. Add a List
        </Button>
      );
    } else {
      content = <AddListItemModal item={this.props.item} />;
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
  item: PropTypes.object.isRequired,
  showNewListModal: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser: authedUser.user.username,
    userListsLoading: users.getUserLists.loading,
    userListsError: users.getUserLists.error,
    userLists: users.userLists,
  };
};

const mapDispatchToProps = { handleGetUserLists, showNewListModal };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddListItem);
