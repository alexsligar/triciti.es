import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Segment, Message, Header } from 'semantic-ui-react';
import { handleGetUser } from '../../actions/users/getUser';

export class UserInfo extends Component {
  componentDidMount() {
    const { handleGetUser, username } = this.props;
    handleGetUser(username);
  }
  render() {
    const { loading, error, user } = this.props;
    let content;
    if (loading) {
      content = <Segment loading />;
    } else if (error) {
      content = <Message error content={error} />;
    } else {
      content = (
        <Fragment>
          <Header as='h2' content={'@' + user.username} />
          <p>{user.name}</p>
          {user.bio && <p>{user.bio}</p>}
        </Fragment>
      );
    }
    return (
      <Grid.Row centered>
        <Grid.Column width={4} textAlign='center'>
          {content}
        </Grid.Column>
      </Grid.Row>
    );
  }
}

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  user: PropTypes.shape({
    username: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
  }),
};

const getLoading = (users, props) => {
  return (
    users.getUser.loading ||
    (users.getUser.error === null &&
      (users.user.username === undefined ||
        users.user.username !== props.username))
  );
};

const mapStateToProps = ({ users }, props) => {
  return {
    loading: getLoading(users, props),
    error: users.getUser.error,
    user: users.user,
  };
};

const mapDispatchToProps = { handleGetUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
