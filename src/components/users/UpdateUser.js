import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import UserProfileFrom from './UserProfileForm';

export default function UpdateUser() {
  return (
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
      className='greyBackground'
    >
      <Grid.Row>
        <Grid.Column width={6}>
          <Header as='h2' textAlign='center'>
            Update Profile
          </Header>
          <UserProfileFrom />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
