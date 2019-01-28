import React from 'react';
import { Modal, Icon } from 'semantic-ui-react';
import UserStarredItems from '../users/UserStarredItems';

export default function StarredItemsModal() {
  return (
    <Modal trigger={<Icon name='star' className='asLink' />}>
      <Modal.Header>Your Starred Items</Modal.Header>
      <Modal.Content>
        <UserStarredItems />
      </Modal.Content>
    </Modal>
  );
}
