import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import ItemForm from './ItemForm';

export default function AddItem() {
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
            Add Somethin&#39;
          </Header>
          <ItemForm editItem={false} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
