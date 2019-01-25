import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import UserInfo from './UserInfo';

export default function Profile(props) {
  const { username } = props.match.params;
  return (
    <Grid>
      <UserInfo username={username} />
    </Grid>
  );
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
};
