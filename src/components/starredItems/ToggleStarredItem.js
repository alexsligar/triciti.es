import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Label } from 'semantic-ui-react';
import {
  handleAddStarredItem,
  handleRemoveStarredItem,
} from '../../actions/starredItems/toggleStarredItem';
import { handleGetUserStarredItems } from '../../actions/users/getUserStarredItems';

export class ToggleStarredItem extends Component {
  componentDidMount() {
    this.props.handleGetUserStarredItems(this.props.authedUser.username);
  }

  handleStarClick = starred => {
    const { item, handleAddStarredItem, handleRemoveStarredItem } = this.props;
    if (starred) {
      handleRemoveStarredItem(item);
    } else {
      handleAddStarredItem(item);
    }
  };

  render() {
    const {
      item,
      userStarredItems,
      userStarredItemsLoading,
      userStarredItemsError,
      authedUser,
    } = this.props;
    let content;
    if (
      userStarredItemsLoading ||
      (userStarredItemsError === null &&
        (userStarredItems.username === null ||
          userStarredItems.username !== authedUser.username))
    ) {
      content = <Button loading>Loading</Button>;
    } else if (userStarredItemsError) {
      content = (
        <Button disabled color='red'>
          {userStarredItemsError}
        </Button>
      );
    } else {
      const starred = userStarredItems.items.some(
        starredItem => starredItem.id === item.id
      );
      content = (
        <Button
          as='div'
          labelPosition='right'
          onClick={() => this.handleStarClick(starred)}
        >
          <Button color='black'>
            <Icon name='star' color={starred ? 'yellow' : 'grey'} />
          </Button>
          <Label
            basic
            color='black'
            pointing='left'
            content={item.starred_number}
          />
        </Button>
      );
    }
    return content;
  }
}

ToggleStarredItem.propTypes = {
  item: PropTypes.object.isRequired,
  authedUser: PropTypes.object.isRequired,
  userStarredItems: PropTypes.object.isRequired,
  userStarredItemsError: PropTypes.string,
  userStarredItemsLoading: PropTypes.bool.isRequired,
  handleGetUserStarredItems: PropTypes.func.isRequired,
  handleAddStarredItem: PropTypes.func.isRequired,
  handleRemoveStarredItem: PropTypes.func.isRequired,
};

const mapStateToProps = ({ users, authedUser }) => {
  return {
    userStarredItems: users.userStarredItems,
    userStarredItemsLoading: users.getUserStarredItems.loading,
    userStarredItemsError: users.getUserStarredItems.error,
    authedUser: authedUser.user,
  };
};

const mapDispatchToProps = {
  handleAddStarredItem,
  handleRemoveStarredItem,
  handleGetUserStarredItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToggleStarredItem);
