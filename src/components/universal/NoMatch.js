import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';

export default function NoMatch() {
  return (
    <Container textAlign='center'>
      <Header icon as='h1'>
        <Icon name='search' />
        This page is not available.
      </Header>
      <div>
        The link you followed may be broken or the page may have been removed.
      </div>
    </Container>
  );
}
