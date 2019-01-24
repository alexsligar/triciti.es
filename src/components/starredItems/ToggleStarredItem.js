import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Button, Icon, Label } from 'semantic-ui-react';
import {
  handleAddStarredItem,
  handleRemoveStarredItem,
} from '../../actions/starredItems/toggleStarredItem';
import { handleGetUserStarredItems } from '../../actions/users/getUserStarredItems';

export class ToggleStarredItem extends Component {
  componentDidMount() {
    const { authedUser, handleGetUserStarredItems } = this.props;
    handleGetUserStarredItems(authedUser.username);
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
    const { item, starred, loading, error } = this.props;
    let content;
    if (loading) {
      content = <Button loading>Loading</Button>;
    } else if (error) {
      content = (
        <Button disabled color='red'>
          {error}
        </Button>
      );
    } else {
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
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  starred: PropTypes.bool.isRequired,
  handleGetUserStarredItems: PropTypes.func.isRequired,
  handleAddStarredItem: PropTypes.func.isRequired,
  handleRemoveStarredItem: PropTypes.func.isRequired,
};

const getLoading = (users, authedUser) => {
  const { username } = users.userStarredItems;
  const { loading, error } = users.getUserStarredItems;
  return (
    loading ||
    (error === null &&
      (username === null || authedUser.user.username !== username))
  );
};

const getStarredItems = users => users.userStarredItems.items;
const getItemId = (state, props) => props.item.id;

const getStarred = createSelector(
  [getStarredItems, getItemId],
  (starredItems, itemId) => {
    return starredItems.some(starredItem => starredItem.id === itemId);
  }
);

const mapStateToProps = ({ users, authedUser }, props) => {
  return {
    loading: getLoading(users, authedUser),
    error: users.getUserStarredItems.error,
    starred: getStarred(users, props),
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
