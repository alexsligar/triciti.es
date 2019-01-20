import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function Loading() {
  return (
    <Dimmer active page inverted>
      <Loader>Loading</Loader>
    </Dimmer>
  );
}
