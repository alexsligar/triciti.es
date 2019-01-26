import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, List, Segment, Message, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { handleGetUserLists } from '../../actions/users/getUserLists';

export class UserLists extends Component {
  componentDidMount() {
    const { username, handleGetUserLists } = this.props;
    handleGetUserLists(username);
  }

  render() {
    const { loading, error, lists, username } = this.props;
    let content;
    if (loading) {
      content = <Segment loading />;
    } else if (error) {
      content = <Message error content={error} />;
    } else {
      content = (
        <Segment>
          <Header as='h3' content={'Lists by @' + username} />
          <List>
            {lists.map(list => {
              return (
                <List.Item key={list.id}>
                  <List.Header>
                    <Link to={'/lists/' + list.id}>{list.name}</Link>
                  </List.Header>
                  {list.description && (
                    <List.Description>{list.description}</List.Description>
                  )}
                </List.Item>
              );
            })}
          </List>
        </Segment>
      );
    }

    return (
      <Grid.Row>
        <Grid.Column width={4}>{content}</Grid.Column>
      </Grid.Row>
    );
  }
}

UserLists.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  lists: PropTypes.array,
  username: PropTypes.string.isRequired,
};

const getLoading = (users, props) => {
  return (
    users.getUserLists.loading ||
    (users.getUserLists.error === null &&
      (users.userLists.username === null ||
        users.userLists.username !== props.username))
  );
};

const mapStateToProps = ({ users }, props) => {
  return {
    loading: getLoading(users, props),
    error: users.getUserLists.error,
    lists: users.userLists.lists,
  };
};

const mapDispatchToProps = { handleGetUserLists };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLists);
