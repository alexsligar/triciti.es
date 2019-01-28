import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Message } from 'semantic-ui-react';
import { handleGetUserStarredItems } from '../../actions/users/getUserStarredItems';
import ItemCard from '../items/ItemCard';

export class UserStarredItems extends Component {
  componentDidMount() {
    const { handleGetUserStarredItems, authedUser } = this.props;
    handleGetUserStarredItems(authedUser.username);
  }

  render() {
    const { loading, error, items } = this.props;
    let content;
    if (loading) {
      content = <Segment loading />;
    } else if (error) {
      content = <Message error content={error} />;
    } else {
      content = items.map(item => <ItemCard key={item.id} {...item} />);
    }
    return content;
  }
}

UserStarredItems.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  items: PropTypes.array.isRequired,
};

const getLoading = (users, authedUser) => {
  return (
    users.getUserStarredItems.loading ||
    (users.getUserStarredItems.error === null &&
      (users.userStarredItems.username === null ||
        users.userStarredItems.username !== authedUser.username))
  );
};

const mapStateToProps = ({ users, authedUser }) => {
  return {
    loading: getLoading(users, authedUser.user),
    error: users.getUserStarredItems.error,
    items: users.userStarredItems.items,
    authedUser: authedUser.user,
  };
};

const mapDispatchToProps = { handleGetUserStarredItems };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserStarredItems);
